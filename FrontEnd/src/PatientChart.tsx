interface PatientChartProps {
    patientId: string | undefined;
}

const PatientChart: React.FC<PatientChartProps> = ({ patientId }) => {

    return (
        <div className="box">
            hello world chart
            <p>{patientId}</p>
        </div>
    );
};


export default PatientChart;