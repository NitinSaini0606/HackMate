const Edu = require('../Models/edu.js');

const saveEducation = async (req,res) => {
  try {
    const existingEdu = await Edu.findOne({ userId: req.user._id });
    
    if(existingEdu) {
      existingEdu.collegeName = req.body.collegeName;
      existingEdu.cityName = req.body.cityName;
      existingEdu.stream = req.body.stream;
      existingEdu.spec = req.body.spec;
      existingEdu.yearStudy = req.body.yearStudy;
      await existingEdu.save();
      return res.status(200).json({ message: "Education details updated successfully" , data: existingEdu });
    }
    const newEdu = new Edu({
      userId: req.user._id,
      collegeName: req.body.collegeName,
      cityName: req.body.cityName,
      stream: req.body.stream,
      spec: req.body.spec,
      yearStudy: req.body.yearStudy
    });
    await newEdu.save();
    return res.status(201).json({ message: "Education details saved successfully", data: newEdu });
  
  }
    
  

  catch (error) {
    console.error("Error saving education details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



const getAllEducation = async (req, res) => {
  try {
    const educationData = await Edu.find().populate("userId", "firstName lastName email");
    return res.status(200).json({ message: "All education data", data: educationData });
  } catch (error) {
    console.error("Error fetching education data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const getMyEducation = async (req, res) => {
//   try {
//     const edu = await Edu.findOne({ userId: req.user._id });

//     if (!edu) {
//       return res.status(404).json({ message: "No education data found" });
//     }

//     return res.status(200).json({ message: "User education data found", data: edu });
//   } catch (error) {
//     console.error("Error fetching user education:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const getMyEducation = async (req, res) => {
  try {
    const edu = await Edu.findOne({ userId: req.user._id });

    if (!edu) {
      return res.status(200).json({ filled: false });
    }

    return res.status(200).json({ filled: true, data: edu });
  } catch (error) {
    console.error("Error fetching user education:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};







module.exports = { saveEducation, getAllEducation, getMyEducation };