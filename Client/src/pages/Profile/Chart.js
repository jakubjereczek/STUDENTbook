import React from 'react';
import { Line } from 'react-chartjs-2';


const Chart = ({ posts, postAnswers }) => {

    const calendar = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    let currentMonth = new Date().getMonth();
    currentMonth = currentMonth + 1;

    const lastTwelveMonths = () => {
        const months = [];

        for (let i = 0; i < 12; i++) {
            if (currentMonth === 12)
                currentMonth = 0;

            months.push(calendar[currentMonth])
            currentMonth++;
        }
        return months;
    }

    const postsCreatedAtMonth = (month, array) => {
        let counter = 0;

        array.forEach(post => {
            const createdAt = post.createdAt;
            const createdDate = new Date(createdAt);

            const postCreatedMonth = createdDate.getMonth() + 1;

            let diffirenceBetweenCreatedAndCurrent = (new Date().getTime() - createdDate) / 1000;
            diffirenceBetweenCreatedAndCurrent = diffirenceBetweenCreatedAndCurrent / (60 * 60 * 24 * 10 * 3);
            let diffirenceMonths = Math.round(diffirenceBetweenCreatedAndCurrent);
            if (postCreatedMonth === month && diffirenceMonths < 12)
                counter++;
        })
        return counter;
    }

    const postsByMonths = (array) => {
        const months = [];

        for (let i = 1 + currentMonth; i <= 12 + currentMonth; i++) {
            let month = i;
            if (month > 12) {
                month = month - 12;
            }
            const postsInMonth = postsCreatedAtMonth(month, array);
            months.push(postsInMonth)
        }
        return months;
    }

    const data = {
        labels: lastTwelveMonths(),
        datasets: [
            {
                label: 'Posty utworzone w danym miesiącu',
                data: postsByMonths(posts),
                fill: true,
                backgroundColor: 'rgb(255, 99, 71, 0.65)',
                borderColor: 'rgba(255, 99, 71, 0.8)',
            },
            {
                label: 'Odpowiedzi na posty utworzone w danym miesiącu',
                data: postsByMonths(postAnswers),
                fill: true,
                backgroundColor: 'rgb(0, 128, 0, 0.65)',
                borderColor: 'rgb(0, 128, 0, 0.8)',
            },

        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };


    return <Line data={data} options={options} />

}


export default React.memo(Chart);