import { Component, OnInit,Renderer, TemplateRef } from '@angular/core';
import { DatatableService } from '.././../common/services/data-table/datatable.service';
import * as moment from 'moment';
import { CurrentUserService } from "../../common/services/user/current-user.service";
import { Title } from "@angular/platform-browser";
import { AppApi } from '../../app-api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChangeDateFormatService } from '../../common/services/date-picker/change-date-format.service';


@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css'],
  providers: [DatatableService,CurrentUserService,ChangeDateFormatService,  DatePipe]

})
export class EmployerDashboardComponent implements OnInit {
  listener: Function;
  currentUser;
  constructor( private title: Title,
    private renderer: Renderer,
    public currentUserService: CurrentUserService,
    private datatableService: DatatableService,
    private modalService: BsModalService,
    private datePipe: DatePipe) { 
      const currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(currentUser);
    }

  ngOnInit(): void {
    this.getjobsList()
  }

  ngAfterViewInit(): void {
    this.listener = this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.getAttribute('href') === 'jobs-list') {
        if (event.target.hasAttribute('data-id') && event.target.getAttribute('name') === 'view') {
         
          //this.viewCliam(event.target.getAttribute('data-id'));
        }
      }
    });
  }

    /**
   * Function call to destroy the listener
   */
     ngOnDestroy(): void {
      if (this.listener) {
        this.listener();
      }
    }
  

      /**
   * Function To Get Claims List
   */
  getjobsList() {
    const tableActions = [
      { name: 'Edit', class: 'fas fa-pen', img: 'eye.svg', title: 'Edit' },
      { name: 'delete', class: 'fas fa-trash', img: 'eye.svg', title: 'Delete' },
    ];
    const url = AppApi.addJobsUrl + '/list';
    const reqParam = [
      { key: 'status', value: 0  }
    ];
    const tableColumns = [
      { title: 'Job Title', data: 'title' },
      { title: 'Applicants', data: 'id' },
      { title: 'Status', data: 'status' },
      { title: 'Date Period', data: 'created_at' },
      { title: 'Action', data: 'id' },
    ];
    if (!$.fn.dataTable.isDataTable('#jobs-list')) {
      this.datatableService.commonDataTable('jobs-list', url, 'full_numbers', tableColumns, 10, true, true, 'lt', 'irp', undefined, [0, 'undefined'], '', reqParam, tableActions, 4, '', '', '', [2], [], [], []);
    } else {
      this.datatableService.commonDataTableReload('jobs-list', url, reqParam);
    }
  }

}
