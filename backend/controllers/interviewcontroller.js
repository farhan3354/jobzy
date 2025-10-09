import Interview from "../models/interviewModel.js";
import User from "./../models/usermodel.js";
import { transporter, interviewMailOptions } from "../helper/registeremail.js";

export const postInterviewForm = async (req, res) => {
  try {
    const { id: candidateId } = req.params;
    const employerId = req?.user.id;
    const { date, time, interviewername, meetingurl, notes } = req.body;

    if (
      !candidateId ||
      !date ||
      !time ||
      !interviewername ||
      !meetingurl ||
      !notes
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(candidateId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }

    const interview = await Interview.create({
      candidateId,
      employerid: employerId,
      date,
      time,
      interviewername,
      meetingurl,
      notes,
    });

    await transporter.sendMail(
      interviewMailOptions(
        user.name || "Candidate",
        user.email,
        interviewername,
        date,
        time,
        meetingurl,
        notes
      )
    );

    return res.status(201).json({ success: true, data: interview });
  } catch (error) {
    console.error("Error creating interview:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// export const postInterviewForm = async (req, res) => {
//   try {
//     const { id: candidateId } = req.params;
//     const employerId = req?.user.id;
//     const { date, time, interviewername, meetingurl, notes } = req.body;

//     if (
//       !candidateId ||
//       !date ||
//       !time ||
//       !interviewername ||
//       !meetingurl ||
//       !notes
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     const interview = await Interview.create({
//       candidateId,
//       employerid: employerId,
//       date,
//       time,
//       interviewername,
//       meetingurl,
//       notes,
//     });

//     return res.status(201).json({ success: true, data: interview });
//   } catch (error) {
//     console.error("Error creating interview:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

//  specific employer interviews

export const getinterviewform = async (req, res) => {
  try {
    const employerid = req?.user.id;
    if (!employerid) {
      return res
        .status(404)
        .json({ success: false, message: "Id is required" });
    }
    const intervi = await Interview.find({ employerid }).populate(
      "candidateId",
      "name email"
    );
    if (!intervi || intervi.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Data is not found in the database" });
    }
    return res.status(200).json({ success: true, intervi });
  } catch (error) {
    return res.status(200).json({ message: "Server Error" });
  }
};

//  specific jobseeker interview

export const jobseekerinterview = async (req, res) => {
  try {
    const userId = req?.user.id;
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "Id is required" });
    }
    const jobseekerinter = await Interview.find({
      candidateId: userId,
    }).populate("candidateId", "name email");
    if (!jobseekerinter) {
      return res
        .status(404)
        .json({ success: false, message: "No interview in the database" });
    }
    return res.status(200).json({ success: true, jobseekerinter });
  } catch (error) {
    return res.status(200).json({ message: "Server Error" });
  }
};
// get by id interviews

export const getinterviewid = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }
    const interview = await Interview.findById(id);
    if (!interview) {
      return res
        .status(404)
        .json({ success: false, message: "No data in the data base" });
    }
    return res.status(200).json({ success: true, interview });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//  Edit interview by the employer

export const Editinterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, interviewername, meetingurl, notes } = req.body;

    if (!date || !time || !interviewername || !meetingurl || !notes) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const updatedInterview = await Interview.findByIdAndUpdate(
      id,
      {
        date,
        time,
        interviewername,
        meetingurl,
        notes,
      },
      { new: true }
    );

    if (!updatedInterview) {
      return res
        .status(404)
        .json({ success: false, message: "Interview not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview: updatedInterview,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
