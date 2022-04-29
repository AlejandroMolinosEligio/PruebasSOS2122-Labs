<script>
    import { onMount } from 'svelte';

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let apiData = [];

    async function getData(){
        const res = await fetch("/data");

        if(res.ok){
            const json = await res.json();
            apiData = json;
            await delay(1000);
            loadGraph();
        }else{
            console.log("Error in request");
        }

    }

    async function loadGraph(){

        Highcharts.chart('container', {

            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },

        
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                }
            }, yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },


            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: apiData
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });

    }

    onMount(getData);

</script>

<svelte:head>
   <script src="https://code.highcharts.com/highcharts.js"></script>
   <script src="https://code.highcharts.com/modules/series-label.js"></script>
   <script src="https://code.highcharts.com/modules/exporting.js"></script>
   <script src="https://code.highcharts.com/modules/export-data.js"></script>
   <script src="https://code.highcharts.com/modules/accessibility.js"></script> 
</svelte:head>

<main>    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Basic line chart showing trends in a dataset. This chart includes the
            <code>series-label</code> module, which adds a label to each line for
            enhanced readability.
        </p>
    </figure>
</main>