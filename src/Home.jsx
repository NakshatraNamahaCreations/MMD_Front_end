import React, { useState, useEffect } from "react";
import {
  BsPeopleFill,
  BsCalendar2Event,
  BsPersonLinesFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

function Home() {
  const [counts, setCounts] = useState({
    totalLeads: 0,
    todaysFollowUp: 0,
    followUp: 0,
    inprocess: 0,
    overdueFollowUp: 0,
    converted: 0,
    dead: 0,
  });

 const [overdueCount,setOverdueCount]=useState()
 const [totalCount, settotalCount] = useState()
 const [deadCount, setdeadCount] = useState()
 const [followupcount, setfollowupcount] = useState()
 const [convertedcount, setconvertedcount] = useState()
 const [inprocesscount, setinprocesscount] = useState()
 const [todaysfollowupcount, settodaysfollowupcount] = useState()
 const adminData = JSON.parse(sessionStorage.getItem("admin"));




useEffect(() => {
  const data1 = { assign: adminData.name };
  const fetchOverdueCount = async () => {
    try {
      const response = await axios.post(
        'https://makemydocuments.nakshatranamahacreations.in/get-overduecount.php',
        data1, // Send data1 as the body of the request
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setOverdueCount(response.data.overdue_count);
    } catch (error) {
      console.error("Error fetching dead count:", error);
    }
  };

  fetchOverdueCount();
}, [adminData.name]);

 
  
  useEffect(() => {
    const data1 = { assign: adminData.name };
    const fetchDeadCount = async () => {
      try {
        const response = await axios.post(
          'https://makemydocuments.nakshatranamahacreations.in/get-leaddeadcount.php',
          data1, // Send data1 as the body of the request
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        setdeadCount(response.data.lead_dead_count);
      } catch (error) {
        console.error("Error fetching dead count:", error);
      }
    };
  
    fetchDeadCount();
  }, [adminData.name]);
  

  useEffect(() => {
    const data1 = { assign: adminData.name };
    const fetchFollowUpCount = async () => {
      try {
        // Use POST to send `data1` as the body of the request
        const response = await axios.post(
          'https://makemydocuments.nakshatranamahacreations.in/get-leadfollowupcount.php',
          data1, // Send data1 in the body
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        setfollowupcount(response.data.followup_count);
      } catch (error) {
        console.error("Error fetching follow-up count:", error);
      }
    };
  
    fetchFollowUpCount();
  }, [adminData.name]);
  
  
  useEffect(() => {
    const data1 = { assign: adminData.name };
  
    const fetchConvertedCount = async () => {
      try {
        // Use POST request to send data1 in the request body
        const response = await axios.post(
          'https://makemydocuments.nakshatranamahacreations.in/get-leadconvertedcount.php',
          data1, // Send data1 as the body of the POST request
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        // Set the converted count to the state
        setconvertedcount(response.data.converted_count);
      } catch (error) {
        console.error("Error fetching converted count:", error);
        // You can set an error state here if needed
      }
    };
  
    fetchConvertedCount();
  }, []);
  

  useEffect(() => {
    const data1 = { assign: adminData.name };

    const fetchCount = async () => {
      try {
        // Use POST method to send 'assign' in the request body
        const response = await axios.post(
          'https://makemydocuments.nakshatranamahacreations.in/get-count.php', 
          data1, // Send 'assign' as the request body
          {
            headers: {
              "Content-Type": "application/json", // Define content type as JSON
            },
          }
        );

        // Set the count value from the response data
        settotalCount(response.data.count);

      } catch (error) {
        console.error("Error fetching count:", error);
        // Handle error if needed
      }
    };

    fetchCount();
  }, [adminData.name]); 

  useEffect(() => {
    const data1 = { assign: adminData.name };

    const fetchInprocessCount = async () => {
      try {
        // Use POST method to send 'assign' in the request body
        const response = await axios.post(
          'https://makemydocuments.nakshatranamahacreations.in/get-leadinprocesscount.php', 
          data1, // Send 'assign' in the request body
          {
            headers: {
              "Content-Type": "application/json", // Specify content type
            },
          }
        );

        // Set the 'lead_in_process_count' value from the response data
        setinprocesscount(response.data.lead_in_process_count);

      } catch (error) {
        console.error("Error fetching lead in process count:", error);
        // Handle error if needed
      }
    };

    fetchInprocessCount();
  }, [adminData.name]);



  
useEffect(() => {
  const data1 = { assign: adminData.name };

  const fetchTodayCount = async () => {
    try {
      // Use POST method to send 'assign' in the request body
      const response = await axios.post(
        'https://makemydocuments.nakshatranamahacreations.in/get-todaysfollowupcount.php', 
        data1, 
        {
          headers: {
            "Content-Type": "application/json", // Specify content type
          },
        }
      );

      // Set the 'lead_in_process_count' value from the response data
      settodaysfollowupcount(response.data.todays_count);

    } catch (error) {
      console.error("Error fetching lead in process count:", error);
      // Handle error if needed
    }
  };

  fetchTodayCount();
}, [adminData.name]);

  
  
  

  return (
    <>
    <Helmet>
    <title>Dashboard - Make my Documents</title>


<meta name="author" content="https://leads.makemydocuments.in/home"/>


    </Helmet>
    <main className="main-container">
      <div
        className="main-cards"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          width: "65%",
          marginLeft: "15%",
          color: "white",
        }}
      >
        <Link
          to="/new-leads"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
              borderRadius: "25px",
              backgroundColor: "#2b4871",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto" , fontSize:"40px", fontFamily:"Poppins, sans-serif" }}>
            {totalCount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsPeopleFill className="card-icon" />
              <span style={{whiteSpace:'nowrap', fontFamily:"Poppins, sans-serif", fontSize:'12px'}}>New Leads</span>
            </div>
          </div>
        </Link>


        <Link
          to="/over-due"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
              borderRadius: "25px",
              backgroundColor: "#ff8007",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto", fontSize:"40px" }}>
              {overdueCount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsPersonLinesFill className="card-icon" />
              <span style={{whiteSpace:'nowrap', fontFamily:"Poppins, sans-serif",fontSize:'12px'}}>Overdue Follow-up</span>
            </div>
          </div>
        </Link>
        <Link
          to="/today-follow-up"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
              borderRadius: "25px",
              backgroundColor: "#0396b3",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto", fontSize:"40px",  }}>
              {todaysfollowupcount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsCalendar2Event className="card-icon" />
              <span style={{whiteSpace:'nowrap', fontFamily:"Poppins, sans-serif", fontSize:'12px'}}>Today's Follow-up</span>
            </div>
          </div>
        </Link>

        <Link
          to="/follow-up"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
              borderRadius: "25px",
              backgroundColor: "#e7a200",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto", fontSize:"40px" }}>
              {followupcount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsPersonLinesFill className="card-icon" />
              <span style={{ fontFamily:"Poppins, sans-serif", fontSize:'12px'}}>Follow up</span>
            </div>
          </div>
        </Link>


        <Link
          to="/in-process"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
             
              borderRadius: "25px",
              backgroundColor: "#e84c21",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto" , fontSize:"40px"}}>
              {inprocesscount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsPersonLinesFill className="card-icon" />
              <span style={{whiteSpace:'nowrap', fontFamily:"Poppins, sans-serif", fontSize:'12px'}}>In Process</span>
            </div>
          </div>
        </Link>
      

        <Link
          to="/converted"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
              borderRadius: "25px",
              backgroundColor: "#79a814",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto", fontSize:"40px" }}>
              {convertedcount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsPersonLinesFill className="card-icon" />
              <span style={{ fontFamily:"Poppins, sans-serif", fontSize:'12px'}}>Converted</span>
            </div>
          </div>
        </Link>

        {/* <Link
          to="/dead"
          style={{
            textDecoration: "none",
            flex: "1 1 calc(33.33% - 20px)",
          }}
        >
          <div
            className="card"
            style={{
              height: "200px",
              borderRadius: "25px",
              backgroundColor: "#e84c21",
            }}
          >
            <h1 className="card-number" style={{ color: "white", margin: "auto" , fontSize:"50px"}}>
              {deadCount}
            </h1>
            <div className="card-footer" style={{ color: "white" }}>
              <BsPersonLinesFill className="card-icon" />
              <span style={{ fontFamily:"Poppins, sans-serif"}}>Dead</span>
            </div>
          </div>
        </Link> */}

        
      </div>
    </main>
    </>
  );
}

export default Home;
