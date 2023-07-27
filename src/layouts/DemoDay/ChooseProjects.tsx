import React, { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { TeamProject } from "../../config/helper"
import NewHeader from "../header/NewHeader"

const ChooseProjects = () => {
  const [teamData, setTeamData] = useState<TeamProject[]>([])

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreV9, "teams"))
        const teams: TeamProject[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          teams.push({
            teamName: data.teamName,
            projectTitle: data.projectTitle,
            participants: data.participants,
            projectDescription: data.projectDescription,
          })
        })
        setTeamData(teams)
      } catch (error) {
        console.log("Error fetching team data:", error)
      }
    }

    fetchTeamData()
  }, [])

  return (
    <React.Fragment>
      <NewHeader />
      <div>
        {teamData.length > 0 ? (
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-12">
                <div className="card mb-4">
                  <div className="card-header pb-0">
                    <h6>Team Information</h6>
                  </div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Team Name
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Project Title
                            </th>
                            
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Participants
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Project Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamData.map((team, index) => (
                            <tr key={index}>
                              <td>{team.teamName}</td>
                              <td>{team.projectTitle}</td>
                              <td>{team.participants.join(", ")}</td>
                              <td style={{ whiteSpace: "pre-line", textAlign: "left" }}>{team.projectDescription}</td>
                              {/* <td>{team.projectDescription}</td> */}
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 style={{ padding: "2em", left: "50%" }}>No Team Data Found</h1>
        )}
      </div>
    </React.Fragment>
  )
}

export default ChooseProjects
