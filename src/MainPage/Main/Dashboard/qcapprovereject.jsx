import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Required styles
import { pdfjs } from "react-pdf";
import { API_HOST } from "../../../base_URL/http";
import { Link, useHistory } from "react-router-dom";
import { Approve, ResetApproveState } from "../../../store/approve";
import { Reject, ResetRejectedState } from "../../../store/reject";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

function ApproveReject() {
  const [pdfSrc, setPdfSrc] = useState(""); // Store PDF file URL
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.login.token); // Retrieve token from Redux store
  const approveResponse = useSelector((state) => state.approve.approve); // Get response from Approve action
  const rejectResponse = useSelector((state) => state.reject.reject); // Get response from Reject action

  useEffect(() => {
    const storedpdfFileId = localStorage.getItem("PdfFileId");
    if (storedpdfFileId) {
      const fullFileUrl = `${API_HOST}scan/serve_tiff_as_pdf/${storedpdfFileId}/`;
      setPdfSrc(fullFileUrl); // Set the PDF URL
    }
  }, []);

  const dispatchApproveAction = () => {
    const storedpdfFileId = localStorage.getItem("PdfFileId");
    if (storedpdfFileId) {
      dispatch(Approve(token, storedpdfFileId)); // Dispatch the Approve action
      
    }
  };

  const dispatchRejectAction = () => {
    const storedpdfFileId = localStorage.getItem("PdfFileId");
    if (storedpdfFileId) {
      dispatch(Reject(token, storedpdfFileId)); // Dispatch the Reject action
    }
  };

  useEffect(() => {
    if (approveResponse?.message) {
      message.success("File Approved.", 3);
      dispatch(ResetApproveState());
      history.push("/app/main/processed-files"); // Navigate to processed files
    }
  }, [approveResponse]);

  useEffect(() => {
    if (rejectResponse?.message) {
      message.success("File Rejected.", 3);
      dispatch(ResetRejectedState());
      history.push("/app/main/processed-files"); // Navigate to processed files
    }
  }, [rejectResponse]);

  useEffect(() => {
    dispatch(ResetApproveState());
    dispatch(ResetRejectedState());
}, [dispatch]);


  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Files</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Tiff Files As Pdf</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-2">
              <button
                className="btn btn-success btn-block"
                onClick={dispatchApproveAction} // Call the function that dispatches the approve action
              >
                Approve
              </button>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-danger btn-block"
                onClick={dispatchRejectAction} // Call the function that dispatches the reject action
              >
                Reject
              </button>
            </div>
          </div>
          {/* /Page Header */}

          {/* PDF Viewer with adjustments */}
          {pdfSrc && (
            <div
              style={{
                maxWidth: "100%",
                maxHeight: "50vh", // Limit the height to 50% of the viewport height
              }}
            >
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
              >
                <Viewer
                  fileUrl={pdfSrc}
                  defaultScale={1.0} // Set a default scale to make the PDF visible
                  scale={1.0} // You can tweak this scale value for different zoom levels
                />
              </Worker>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApproveReject;
// import React, { useState, useEffect } from "react";
// import { API_HOST } from "../../../base_URL/http";
// import { Link, useHistory } from "react-router-dom";
// import { Approve } from "../../../store/approve";
// import { Reject } from "../../../store/reject";
// import { useDispatch, useSelector } from "react-redux";

// function QcApproveReject() {
//   const [pdfSrc, setPdfSrc] = useState(""); // Store PDF file URL
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const token = useSelector((state) => state.login.token); // Retrieve token from Redux store

//   useEffect(() => {
//     const storedPdfFileId = localStorage.getItem("QcFileId");
//     if (storedPdfFileId) {
//       const fullFileUrl = `${API_HOST}scan/serve_tiff_as_pdf/${storedPdfFileId}/`;
//       setPdfSrc(fullFileUrl); // Set the PDF URL
//     }
//   }, []);

//   const dispatchApproveAction = () => {
//     const storedPdfFileId = localStorage.getItem("QcFileId");
//     if (storedPdfFileId) {
//       dispatch(Approve(token, storedPdfFileId)); // Dispatch the Approve action
//       history.push("/app/main/processed-files");
//     }
//   };

//   const dispatchRejectAction = () => {
//     const storedPdfFileId = localStorage.getItem("QcFileId");
//     if (storedPdfFileId) {
//       dispatch(Reject(token, storedPdfFileId)); // Dispatch the Reject action
//       history.push("/app/main/processed-files");
//     }
//   };

//   return (
//     <div>
//       <div className="page-wrapper">
//         <div className="content container-fluid">
//           {/* Page Header */}
//           <div className="page-header">
//             <div className="row align-items-center">
//               <div className="col">
//                 <h3 className="page-title">Files</h3>
//                 <ul className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="/app/main/dashboard">Dashboard</Link>
//                   </li>
//                   <li className="breadcrumb-item active">Tiff Files As Pdf</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="row align-items-center mb-4">
//             <div className="col-md-2">
//               <button
//                 className="btn btn-success btn-block"
//                 onClick={dispatchApproveAction}
//               >
//                 Approve
//               </button>
//             </div>

//             <div className="col-md-2">
//               <button
//                 className="btn btn-danger btn-block"
//                 onClick={dispatchRejectAction}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>

//           {/* PDF Viewer */}
//           {pdfSrc ? (
//             <div
//               style={{
//                 width: "100%",
//                 height: "70vh", // Adjust the height of the PDF viewer
//               }}
//             >
//               <iframe
//                 src={pdfSrc}
//                 title="PDF Viewer"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   border: "none",
//                 }}
//               ></iframe>
//             </div>
//           ) : (
//             <p>No PDF file available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QcApproveReject;
