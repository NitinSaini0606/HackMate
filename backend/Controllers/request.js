const ConnectionRequest = require('../Models/connReq');
const User = require('../Models/user');


const createConnectionRequest = async (req, res) => {
    const {receiverId} = req.body;
    try {
        const request = new ConnectionRequest({
            sender : req.user._id,
            receiver: receiverId
        })
        await request.save();
        res.status(201).json({message: "Connection request sent successfully"});

    }
    catch (error) {
        res.status(500).json({message: "error sending connection request"});
    }
}

const getReceivedRequests = async (req , res) => {
    try {
        const requests = await ConnectionRequest.find({receiver: req.user._id , status: 'pending'}).populate('sender', 'firstName lastName email contact');
        res.status(200).json({data: requests});
     }
     catch (error) {
        res.status(500).json({message: "Error fetching connection requests"});
     }
}


const acceptConnectionRequest = async (req, res) => {
    const requestId = req.params.id;
    try {
        const connection = await ConnectionRequest.findById(requestId);

        if(!connection) {
            return res.status(404).json({message: "Connection request not found"});
        }
        connection.status = 'accepted';
        await connection.save();

        res.status(200).json({message: "Connection request accepted successfully"});
    }

    catch (error) {
        res.status(500).json({message: "Error accepting connection request"});
    }
}

const rejectConnectionRequest = async (req, res) => {
    try {
    const requestId = req.params.id;
    const request = await ConnectionRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (!request.receiver.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to reject this request" });
    }

    request.status = 'declined';
    await request.save();

    res.status(200).json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting request" });
  }
}


const getSentRequests = async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({ sender: req.user._id })
      .populate('receiver', 'firstName lastName email');
    res.status(200).json({ data: requests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sent requests" });
  }
};

module.exports = {createConnectionRequest, getReceivedRequests, acceptConnectionRequest, rejectConnectionRequest, getSentRequests};