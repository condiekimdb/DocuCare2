interface DoctorNotesProps {
    patientId: string | undefined;
}

const DoctorNotes: React.FC<DoctorNotesProps> = ({ patientId }) => {

    return (
        <div className="box">
            Doctor Notes Placeholder
            <p>{patientId}</p>
        </div>
    );
};


export default DoctorNotes;