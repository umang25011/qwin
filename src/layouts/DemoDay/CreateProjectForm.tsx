import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/store"
import { addParticipant } from './CreateProjectFormSlice';
import { collection, addDoc } from 'firebase/firestore';
import { firestoreV9 } from '../../config/IntialiseFirebase';
import "./CreateProjectForm.css"
import NewHeader from '../header/NewHeader';
import { useNavigate } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

const Form: React.FC = () => {
    const dispatch = useAppDispatch();
    const [teamName, setTeamName] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [participantId, setParticipantId] = useState('');
    const [participants, setParticipants] = useState<string[]>([]);

    const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(event.target.value);
    };

    const handleProjectTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectTitle(event.target.value);
    };

    const handleProjectDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProjectDescription(event.target.value);
    };

    const handleParticipantIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParticipantId(event.target.value);
    };

    const handleAddParticipant = () => {
        if (participantId !== '') {
            setParticipants((prevParticipants) => [...prevParticipants, participantId]);
            setParticipantId('');
        }
    };
    const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Save the form data to Firebase Firestore
        const docRef = await addDoc(collection(firestoreV9, 'teams'), {
            teamName,
            projectTitle,
            projectDescription,
            participants,
        });

        // Dispatch an action to add the participant to Redux
        dispatch(addParticipant({ teamId: docRef.id, participants }));

        // Reset the form
        setTeamName('');
        setProjectTitle('');
        setProjectDescription('');
        setParticipants([]);
        toastr.success(`Project Submitted`,"");
        navigate("/")
        
    };

    return (
        <div>
            <NewHeader />
            <main style={{ position: "relative", top: "14em" }} className="main-content mt-0">
                <section className="row"><div className='col-3'/>
                    <div className="col-6">
                        <div className="container mb-5">
                            <div className="row mt-lg-n10 mt-md-n11 mt-n12">
                                <div className="col-12 mx-auto">
                                    <div className="card z-index-0">
                                        <div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="teamName" className="form-label">Team Name:</label>
                                                        <input
                                                            type="text"
                                                            id="teamName"
                                                            className="form-input"
                                                            value={teamName}
                                                            onChange={handleTeamNameChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="projectTitle" className="form-label">Project Title:</label>
                                                        <input
                                                            type="text"
                                                            id="projectTitle"
                                                            className="form-input"
                                                            value={projectTitle}
                                                            onChange={handleProjectTitleChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="projectDescription" className="form-label">Project Description:</label>
                                                        <textarea
                                                            id="projectDescription"
                                                            className="form-textarea"
                                                            value={projectDescription}
                                                            onChange={handleProjectDescriptionChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="participantId" className="form-label">Participant University ID:</label>
                                                        <input
                                                            type="number"
                                                            id="participantId"
                                                            className="form-input"
                                                            value={participantId}
                                                            onChange={handleParticipantIdChange}
                                                            
                                                        />
                                                        <button type="button" className="create-button btn bg-gradient-dark w-100 my-4 mb-2" onClick={handleAddParticipant}>
                                                            Add Participants
                                                        </button>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Participants:</label>
                                                        <ul>
                                                            {participants.map((participant) => (
                                                                <li key={participant}>{participant}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <button type="submit" className="create-button btn bg-gradient-dark w-100 my-4 mb-2">Submit</button>
                                                </form>
                                            </div>
                                        </div>

                                    </div> </div></div></div></div></section></main>
        </div>
    );
};

export default Form;
