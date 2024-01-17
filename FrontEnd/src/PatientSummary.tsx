interface PatientSummaryProps {
    patientId: string | undefined;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patientId }) => {

    return (
        <div className="box">
            Patient Summary Placeholder
            <p>{patientId}</p>
        </div>
    );
};


export default PatientSummary;