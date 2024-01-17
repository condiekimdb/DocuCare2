interface PatientSummaryProps {
    patientId: string | undefined;
    patientData: any;
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