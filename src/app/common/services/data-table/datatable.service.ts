/* This Service File Basically Performs common Functions on Datatable 
which needs to be accessed all over the Application
where Datatable will be Used. */
import { Injectable } from '@angular/core';
import { QueryList, ViewChildren } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import 'rxjs/add/operator/catch';
import { CurrentUserService } from '../../../common/services/user/current-user.service';
import { ChangeDateFormatService } from '../../../common/services/date-picker/change-date-format.service';
import Swal from 'sweetalert2';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Injectable()
export class DatatableService {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<any>;
  reqParam;
  reqDateParams;
  token;
  pageLength;
  selectedRow: any = [];
  resultCount = 0;
  approvedUserCount = 0;
  currentUser;


  constructor(
    private currentUserService: CurrentUserService,
    private changeDateFormatService: ChangeDateFormatService) {
    this.token = currentUserService.token;
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
  }

  /**
   * Function for reloading dataTable with page reload
   * @param dtElements dtElements
   * @param tableID tableID
   * @param trr trr
   * @param enableColumnFilter enableColumnFilter
   */
  reloadTableElem(dtElements, tableID, trr, enableColumnFilter) {
    if (trr) {
      dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        dtElement.dtInstance.then((dtInstance: any) => {
          if (dtInstance.table().node().id === tableID) {
            dtInstance.table().destroy();
            trr.next();
            if (enableColumnFilter) {
              this.columnFilter(dtElements, tableID);
              dtInstance.columns().every(function () {
                $('input select', this.footer()).val('');
              });
            }
          }
        });
      });
    }
  }

  /**
   * Function for column data filter
   * @param dtElements dtElements
   * @param tableID tableID
   */
  columnFilter(dtElements, tableID) {
    dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        if (dtInstance.table().node().id === tableID) {
          dtInstance.columns().every(function () {
            const that = this;
            $('input.tFootInput, select.tFootSelect', this.footer()).on('keyup change', function () {
              if (that.search() !== this['value']) {
                that
                  .search(this['value'])
                  .draw();
              }
            });
          });
        }
      });
    });
    $.fn.dataTable.ext.errMode = 'throw';
  }

  /**
   * Method for Date-Format
   * @param tableId tableId
   * @param url url
   * @param postArray postarray
   * @param dateParams dateParams
   */
  commonDataTableReload(tableId, url, postArray, dateParams = null) {
    this.reqParam = postArray;
    const tableElem = $('#' + tableId).DataTable();
    tableElem.ajax.url(url).load();
    tableElem.draw();
  }

  /**
   * @param tableId tableId
   * @param dataArray dataArray
   */
  jqueryDataTableClientSideReload(tableId, dataArray) {
    const tableElem = $('#' + tableId).DataTable();
    tableElem.rows.add(dataArray).draw();
  }

  /**
   * @param tableId tableId
   * @param dataArray dataArray
   */
  jqueryDataTableClientSideClearReload(tableId, dataArray) {
    const tableElem = $('#' + tableId).DataTable();
    tableElem.clear();
    tableElem.rows.add(dataArray).draw();
  }

  /**
   * Main Function to create dataTable
   * @param tableId tableID
   * @param url url
   * @param pagingType pagingType
   * @param columns columns
   * @param pageLength pageLength
   * @param serverSide serverSide
   * @param processing processing
   * @param topDom topDom
   * @param bottomDom bottomDom
   * @param checkboxCol checkboxCol
   * @param defaultOrderBy defaultOrderBy
   * @param actionCol actionCol
   * @param reqParam reqParam
   * @param tableActions tableActions
   * @param actionColumn actionColum
   * @param dateCols dateCols
   * @param isRedirect isRedirect
   */
  commonDataTable(tableId, url: string, pagingType, columns, pageLength: number,
    serverSide: boolean, processing: boolean, topDom: string, bottomDom: string,
    checkboxCol: number, defaultOrderBy, actionCol: string, reqParam, tableActions, actionColumn, dateCols = null, isRedirect = null, amountColumn = null, statusColumn = null, storeColumn = null, productColumn = null, sellerColumn = null) {
    const self = this;
    self.reqParam = reqParam;
    const token = this.token;
    const finalDom = '<"top"' + topDom + '<"clear">>' + bottomDom + '<"bottom"<"clear">>';
    const tableElem = $('#' + tableId).DataTable({
      language: {
        emptyTable: 'Não há itens para visualizar',
        searchPlaceholder: "Buscar",
        search: "",
        paginate: {
          first: "",
          last: "",
          next: '&#8594;', // or '→'
          previous: '&#8592;' // or '←' 
        }
      },
      pagingType: 'simple_numbers',
      processing: processing,
      serverSide: serverSide,
      pageLength: pageLength,
      ordering: false,
      'createdRow': function (row, data, dataIndex) {
        if (data['sale_type'] === 2) {
          $(row).addClass('updatedRow');
        } else {
         // $(row).addClass('cancelRow');
        }
      },
      lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
      columnDefs: [{
        'targets': actionColumn,
        'searchable': false,
        'orderable': false,
        'className': '',
        'render': function (data, type, full, meta) {
          var str = '';
          for (var i = 0; i < tableActions.length; i++) {
            if (tableActions[i]['showAction'] !== 'F') {
             str = `<div class="action-btn">
                  <a href="#"><i class="fas fa-pen"></i></a>
                  <a class="del" href="#"><i class="fas fa-trash"></i></a>
                </div>`
              // str = str + '<button class="extraclass ' + tableActions[i]['class'] + '" title="' + tableActions[i]['title'] + '"data-toggle="tooltip"><img src="../../../../assets/images/' + tableActions[i]['img'] + '" href="' + tableId + '" name="' + tableActions[i]['name'] + '" data-id = "' + data + '" /></button>';
            }
          }
          return str;
        }
      },

      {
        'targets': amountColumn,
        'searchable': false,
        'orderable': true,
        'className': '',
        'render': function (data, type, full, meta) {
          if (tableId === 'proposal-list' || tableId === 'jobs-list' || tableId === 'claims-list' || tableId === 'quote-list') {
            if (data) {
              return data.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            } else {
              return 'N/A';
            }
          } else {
            return data;
          }
        }
      },
      {
        'targets': dateCols,
        'searchable': false,
        'orderable': true,
        'className': '',
        'render': function (data, type, full, meta) {
          if (tableId === 'proposal-list' || tableId === 'jobs-list' || tableId === 'quote-list' || tableId === 'broker-users-list') {
            if (data) {
              return self.changeDateFormatService.dateFormate(data);
            } else {
              return 'N/A';
            }
          } else {
            return data;
          }
        }
      },
      {
        'targets': statusColumn,
        'searchable': false,
        'orderable': true,
        'className': '',
        'render': function (data, type, full, meta) {
          if (tableId === 'approved-users-list' || tableId === 'jobs-list') {
            if (data == 'Pending') {
              return '<td class="status-data" >' + data + '</td>';

            } else {
              return '<td class="success status-data">' + data + '</td>';

            }

          } else {
            return '<td class="status-data" >' + data + '</td>';
          }
        }
      },
      ],
      order: defaultOrderBy,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          const tableID = $(row).closest('table').attr('id');
          if (tableID === 'approved-users-list' || tableID === 'jobs-list' || tableId === 'quote-list' || tableId === 'broker-users-list' || tableId === 'proposal-list' || tableId === 'payment-list'
          ) {
            this.selectedRow = data;
          }
        });
        return row;
      },
      'ajax': {
        'url': url,
        "contentType": "application/json; charset=utf-8",
        'type': 'POST',
        "dataType": "json",
        xhr: function () {
          var xhr = $.ajaxSettings.xhr();
          $('#' + tableId + '_processing').show();
          return xhr;
        },
        "data": function (d) {
          for (var i = 0; i < self.reqParam.length; i++) {
            d[self.reqParam[i]['key']] = self.reqParam[i]['value']
          }
          return JSON.stringify(d);
        },
        "dataSrc": function (json) {
          const tfoot = $('#' + tableId + ' tfoot tr');
          $('#' + tableId + ' thead').prepend(tfoot);
          if (json.code === 201) {
            if (tableId == 'inprogress-users-list' || tableId == 'jobs-list' || tableId == 'broker-users-list') {
              for (var i = 0; i < json.data.length; i++) {
                if (json.data[i]['status'] == 0) { //New Request Step One
                  json.data[i]['status'] = 'NOVO PEDIDO';
                } else if (json.data[i]['status'] == 1) { //Request is approved by admin and user completing the rest info
                  json.data[i]['status'] = 'Pending';
                } else if (json.data[i]['status'] == 2) { //User completed the step two and admin need to look and accept/reject
                  json.data[i]['status'] = 'Aproved';
                } else if (json.data[i]['status'] == 3) { //User request finally become approved user
                  json.data[i]['status'] = 'ATIVO';
                } else if (json.data[i]['status'] == 4) { //Request rejected by admin
                  json.data[i]['status'] = 'REJEITADA';
                } else if (json.data[i]['status'] == 5) { //Deactivate user by admin
                  json.data[i]['status'] = 'INATIVO';
                }
              }
            }

            if (tableId == 'approved-users-list') {
              self.approvedUserCount = json.recordsTotal;
            } else {
              self.resultCount = json.recordsTotal;
            }

            return json.data;
          } else if (json.code === 404) {
            return '';
          } else {
            return '';
          }
        },
        'beforeSend': function (request) {
          request.setRequestHeader('authorization', token);
          request.setRequestHeader('Content-Type', 'application/json');
        },
      },
      'columns': columns
    });
    $.fn.dataTable.ext.errMode = 'throw';
  }

  /**
   * Function to copy the link
   * @param val 
   * @param message 
   */
  copyLink(val: string, message: string) {
    if (val) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.getElementById('copy').appendChild(selBox);
      selBox.select();
      var copied = document.execCommand('Copy');
      if (copied) {
        Swal.fire({
          title: message,
          icon: 'success',
          timer: 5000,
          position: "top-right",
          toast: true,
          showCancelButton: false,
          showConfirmButton: false
        })
      } else {
        Swal.fire({
          title: "Link não " + message,
          icon: 'error',
          timer: 5000,
          position: "top-right",
          toast: true,
          showCancelButton: false,
          showConfirmButton: false
        })
      }
      document.getElementById('copy').removeChild(selBox);
    } else {
      Swal.fire({
        title: "Link não encontrado!",
        icon: 'error',
        timer: 5000,
        position: "top-right",
        toast: true,
        showCancelButton: false,
        showConfirmButton: false
      })
    }

  }
}
