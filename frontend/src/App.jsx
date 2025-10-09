import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./component/common/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import UserLayout from "./component/common/userLayout/UserLayout.jsx";
import Userdashboard from "./pages/userDashboardPages/UserDashboard.jsx";
import Job from "./pages/userDashboardPages/Job.jsx";
import ApplyJob from "./pages/userDashboardPages/ApplyJob.jsx";
import Profile from "./pages/userDashboardPages/Profile.jsx";
import Appliedjob from "./pages/userDashboardPages/AppliedJob.jsx";
import EmployerLayout from "./component/common/employerLayout/EmployerLayout.jsx";
import EmployerHome from "./pages/employerDashboardPages/EmployerHome.jsx";
import PostJob from "./pages/employerDashboardPages/PostJob.jsx";
import EmployerProfile from "./pages/employerDashboardPages/EmployerProfile.jsx";
import Applicant from "./pages/employerDashboardPages/Applicant.jsx";
import AllPostedJob from "./pages/employerDashboardPages/AllPostedJob.jsx";
import JobApplicant from "./pages/employerDashboardPages/JobApplicant.jsx";
import AdminLayout from "./component/common/admin/AdminLayout.jsx";
import AdminHome from "./pages/adminDashboardPages/AdminHome.jsx";
import AdminProfile from "./pages/adminDashboardPages/AdminProfile.jsx";
import ManageUser from "./pages/adminDashboardPages/ManageUser.jsx";
import ManageEmployer from "./pages/adminDashboardPages/ManageEmployer.jsx";
import ManageJobs from "./pages/adminDashboardPages/ManageJobs.jsx";
import ChoseRole from "./pages/ChoseRole.jsx";
import ScheduleInterview from "./component/employerDashboard/ScheduleInterview.jsx";
import Careers from "./pages/Carrier.jsx";
import SeeInterviews from "./pages/employerDashboardPages/SeeInterviews.jsx";
import Interview from "./pages/userDashboardPages/Interview.jsx";
import EditJob from "./component/employerDashboard/EditJob.jsx";
import ProtectRoute from "./utils/ProtectedRoutes.jsx";
import EmployerJobDetails from "./component/employerDashboard/EmployerJobDetails.jsx";
import ScrollTop from "./pages/ScrollTop.jsx";
import JobSeekerProfileForm from "./component/userDashbord/profile/ProfileForm.jsx";
import EditJobSeeker from "./component/userDashbord/profile/EditProfileForm.jsx";
import AllJobsApplicant from "./pages/employerDashboardPages/AllJobsApplicant.jsx";
import Post from "./pages/testformforpractice/Post.jsx";
import GetData from "./pages/testformforpractice/GetData.jsx";
import EditScheduledInterview from "./component/employerDashboard/EditScheduledInterview.jsx";
import CreateProfile from "./component/employerDashboard/postJobForm/CreateProfile.jsx";
import EditProfile from "./component/employerDashboard/postJobForm/EditProfile.jsx";
import CreateAdminProfile from "./component/adminDashoardComponents/CreateAdminProfile.jsx";
import EditAdminProfile from "./component/adminDashoardComponents/EditAdminProfile.jsx";
import ChangePassword from "./component/adminDashoardComponents/ChangePassword.jsx";
import OTPVerifyForm from "./component/Login/OtpVerify.jsx";
import Blog from "./pages/Blog.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import FindByIdBlog from "./component/FindByIdBlog.jsx";
import BlogPage from "./pages/adminDashboardPages/BlogPage.jsx";
import EditBlog from "./component/adminDashoardComponents/EditBlogs.jsx";
import AdminQueries from "./component/adminDashoardComponents/AdminQuery.jsx";
import TaskInterview from "./pages/TaskInterview.jsx";

function App() {
  return (
    <Router>
      <ScrollTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="task" element={<TaskInterview />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="carrier" element={<Careers />} />
          <Route path="chose-register" element={<ChoseRole />} />
          <Route path="register/job-seeker" element={<Register />} />
          <Route path="register/employer" element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerifyForm />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<FindByIdBlog />} />
          <Route path="postformdata" element={<Post />} />
          <Route path="getformdata" element={<GetData />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route element={<ProtectRoute role="job-seeker" />}>
          <Route path="/user-dashboard" element={<UserLayout />}>
            <Route index element={<Userdashboard />} />
            <Route path="jobs" element={<Job />} />
            <Route path="apply/:id" element={<ApplyJob />} />
            <Route path="applied" element={<Appliedjob />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/create" element={<JobSeekerProfileForm />} />
            <Route path="profile/edit" element={<EditJobSeeker />} />
            <Route path="change-password" element={<ChangePassword />} />

            <Route path="interview" element={<Interview />} />
          </Route>
        </Route>

        <Route element={<ProtectRoute role="employer" />}>
          <Route path="/employer-dashboard" element={<EmployerLayout />}>
            <Route index element={<EmployerHome />} />
            <Route path="posta-job" element={<PostJob />} />
            <Route path="profile" element={<EmployerProfile />} />
            <Route path="alljobs-applicant" element={<AllJobsApplicant />} />
            <Route path="job-applicants/:id" element={<Applicant />} />

            <Route path="applicant/:id" element={<JobApplicant />} />
            <Route
              path="applicant/:id/schedule-interview"
              element={<ScheduleInterview />}
            />
            <Route path="all-job/:id" element={<EditJob />} />
            <Route path="view-interviews" element={<SeeInterviews />} />
            <Route
              path="edit-interview/:id"
              element={<EditScheduledInterview />}
            />
            <Route path="createprofile" element={<CreateProfile />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="all-job" element={<AllPostedJob />} />
            <Route
              path="all-job/details/:id"
              element={<EmployerJobDetails />}
            />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route element={<ProtectRoute role="admin" />}>
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="manage-employers" element={<ManageEmployer />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="createprofile" element={<CreateAdminProfile />} />
            <Route path="editadmin" element={<EditAdminProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<FindByIdBlog />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
            <Route path="queries" element={<AdminQueries />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // Direct imports (no lazy)
// import Layout from "./component/common/Layout";
// import Home from "../src/pages/Home";
// import About from "./pages/About";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Contact from "./pages/Contact";
// import UserLayout from "./component/common/userLayout/UserLayout";
// import Userdashboard from "./pages/userDashboardPages/UserDashboard";
// import Job from "./pages/userDashboardPages/Job";
// import Saved from "./pages/userDashboardPages/SavedJob";
// import ApplyJob from "./pages/userDashboardPages/ApplyJob";
// import Profile from "./pages/userDashboardPages/Profile";
// import Appliedjob from "./pages/userDashboardPages/AppliedJob";
// import EmployerLayout from "./component/common/employerLayout/EmployerLayout";
// import EmployerHome from "./pages/employerDashboardPages/EmployerHome";
// import PostJob from "./pages/employerDashboardPages/PostJob";
// import EmployerProfile from "./pages/employerDashboardPages/EmployerProfile";
// import Applicant from "./pages/employerDashboardPages/Applicant";
// import AllPostedJob from "./pages/employerDashboardPages/AllPostedJob";
// import JobApplicant from "./pages/employerDashboardPages/JobApplicant";
// import AdminLayout from "./component/common/admin/AdminLayout";
// import AdminHome from "./pages/adminDashboardPages/AdminHome";
// import AdminProfile from "./pages/adminDashboardPages/AdminProfile";
// import ManageUser from "./pages/adminDashboardPages/ManageUser";
// import ManageEmployer from "./pages/adminDashboardPages/ManageEmployer";
// import ManageJobs from "./pages/adminDashboardPages/ManageJobs";
// import ChoseRole from "./pages/ChoseRole";

// function App() {
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/about", element: <About /> },
//       { path: "/login", element: <Login /> },
//       { path: "/chose-register", element: <ChoseRole /> },
//       { path: "/register/job-seeker", element: <Register /> },
//       { path: "/register/employer", element: <Register /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "*", element: <PageNotFound /> },
//     ],
//   },
//   {
//     path: "/user-dashboard",
//     element: <UserLayout />,
//     children: [
//       { path: "", element: <Userdashboard /> },
//       { path: "jobs", element: <Job /> },
//       { path: "saved", element: <Saved /> },
//       { path: "apply/:id", element: <ApplyJob /> },
//       { path: "applied", element: <Appliedjob /> },
//       { path: "profile", element: <Profile /> },
//     ],
//   },
//   {
//     path: "/employer-dashboard",
//     element: <EmployerLayout />,
//     children: [
//       { path: "", element: <EmployerHome /> },
//       { path: "posta-job", element: <PostJob /> },
//       { path: "profile", element: <EmployerProfile /> },
//       { path: "applicants", element: <Applicant /> },
//       { path: "applicant/:id", element: <JobApplicant /> },
//       { path: "all-job", element: <AllPostedJob /> },
//     ],
//   },
//   {
//     path: "/admin-dashboard",
//     element: <AdminLayout />,
//     children: [
//       { path: "", element: <AdminHome /> },
//       { path: "profile", element: <AdminProfile /> },
//       { path: "manage-users", element: <ManageUser /> },
//       { path: "manage-employers", element: <ManageEmployer /> },
//       { path: "manage-jobs", element: <ManageJobs /> },
//     ],
//   },
// ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
