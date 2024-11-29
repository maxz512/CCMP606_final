const express = require('express');
const cors = require('cors'); // Make sure cors is imported
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3'); // Corrected import
require('dotenv').config(); // To load environment variables

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize AWS S3 client (AWS SDK will automatically use instance profile credentials)
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

// GET route to fetch patient data
app.get('/patients/:patientId', async (req, res) => {
  const { patientId } = req.params;
  const bucketName = process.env.S3_BUCKET_NAME;
  const key = `patients/${patientId}.json`;

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.send(new GetObjectCommand(params));  // Correct command
    const body = await streamToString(data.Body); // Convert stream to string
    res.json(JSON.parse(body)); // Return the patient data
  } catch (error) {
    console.error('Error fetching patient data:', error.message);
    res.status(500).json({ message: 'Error fetching patient data', error: error.message });
  }
});

// POST route to save patient data
app.post('/patients/:patientId', async (req, res) => {
  const { patientId } = req.params;
  const data = JSON.stringify(req.body);
  const bucketName = process.env.S3_BUCKET_NAME;
  const key = `patients/${patientId}.json`;

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentType: 'application/json',
  };

  try {
    await s3.send(new PutObjectCommand(params));
    res.status(201).json({ message: `Patient ${patientId} data saved.` });
  } catch (error) {
    console.error('Error saving patient data:', error.message);
    res.status(500).json({ message: 'Error saving patient data', error: error.message });
  }
});

// Helper function to convert stream to string
function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', reject);
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

