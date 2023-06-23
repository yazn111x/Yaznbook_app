export default function handler(req, res) {
    // Check if call exists in database
    // ...
    res.status(200).json({ exists: true })
    }