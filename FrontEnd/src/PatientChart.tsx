import React, { useEffect } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import './App.css'

interface PatientChartProps {
    patientId: string | undefined;
    patientData: any;
}

const PatientChart: React.FC<PatientChartProps> = ({ patientId, patientData}) => {
    useEffect(() => {
        const sdk = new ChartsEmbedSDK({
            baseUrl: 'https://charts.mongodb.com/charts-clarence_training-nwffr',
        });

        console.log("in patient chart");
        console.log(patientData);

        const chart = sdk.createChart({
            chartId: '65a71b5b-ea68-4d4b-8956-0f8f0a2c55c4',
            filter: {PATIENT: patientId}
        });

        chart
            const chartContainer = document.getElementById('chart');
            try {
                if (chartContainer) {
                    chart.render(chartContainer);
                }
            } catch (error) {
                window.alert('Chart failed to initialise');
            }
    }, [patientId]); // Re-run the effect if patientId changes

    return (
        <div className="box">
            <p>{patientId}</p>
            <div id="chart"></div> {/* Chart will be rendered here */}
        </div>
    );
};

export default PatientChart;
