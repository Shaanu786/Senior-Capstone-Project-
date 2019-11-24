import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import * as timeseries from 'fusioncharts/fusioncharts.timeseries';

const dataUrl =
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json';
const schemaUrl =
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.componentv2.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  title = "Profile"
  projects = ["Project 1","Project 2","Project 3","Project 4","Project 5"]
  badges = ["Team Player", "Frontend Specialist", "Crunch Time Hero"]
  
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '50%';
    this.height = '100%';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: null,
      caption: {
        text: 'Points Made'
      },
      subcaption: {
        text: 'Project Team Members'
      },
      series: 'Type',
      yAxis: [
        {
          plot: 'Points',
          title: 'Points',
          format: {
            suffix: 'pts'
          }
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      // 'C:\Users\chris\Documents\capstone\Senior-Capstone-Project-\capstone\src\app\profile-page\points-data.json'
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      // 'C:\Users\chris\Documents\capstone\Senior-Capstone-Project-\capstone\src\app\profile-page\points-schema.json'
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // After that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }
  
  ngOnInit() {

  }
}
