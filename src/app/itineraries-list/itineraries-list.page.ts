import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-itineraries-list',
  templateUrl: './itineraries-list.page.html',
  styleUrls: ['./itineraries-list.page.scss'],
})
export class ItinerariesListPage implements OnInit {

  private itineraryArray: Array<any>;
  private detailsModalOpen: boolean;
  private currentShownItineraryLegs: Array<any>;
  private leg: any = {};

  constructor(private api: ApiService, private data: DataTransferService) {
    this.detailsModalOpen = false;
  }

  async ngOnInit() {
    this.itineraryArray = await this.getItinerariesList();
  }

  async getItinerariesList(): Promise<Array<any>> {
    const d = this.data;
    const itineraryData: any = await this.api.getItinerary(
      d.getStartCoords(),
      d.getEndCoords(),
      d.getDate(),
      d.getTime(),
      d.getWheelchair(),
      d.getWalkReluctance(),
      d.getMode());
    const res = itineraryData.plan.itineraries;
    return res;
  }

  formatTime(unixDate: number): string {
    const fullDate = new Date(unixDate);
    return fullDate.toString().slice(16,21);
  }

  formatDistance(distance: number): string {
    if (distance > 1000){
      return Math.round(distance/10000)/10 + ' km';
    }
    return distance + ' m';
  }

  secondsToMinutes(seconds: number): string {
    return Math.round(seconds/60) + ' min';
  }

  showDetails(itinerary: any){
    this.currentShownItineraryLegs = itinerary.legs;
    this.detailsModalOpen = true;
    console.log(this.currentShownItineraryLegs);
  }

  closeDetailsModal() {
    this.detailsModalOpen = false;
  }
  consolelog(test: any) {
    console.log(test);
  }
}