import { Component, Pipe, ViewChild, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // data form variables
  public status;
  public judul;
  public deskripsi;
  public tgl_mulai;
  public tgl_selesai;
  public prioritas;

  // datepicker formatter
  public myDatePickerOptions: IMyOptions = {
      dateFormat: 'mm/dd/yyyy',
      openSelectorOnInputClick: true,
      editableDateField: false
  };

  // data variable
  public data = [];

  // month data in Indonesia
  public month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
  'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  // show error if any form empty
  public showError = true;

  constructor(private toastrService: ToastrService) {

    // data initialization
    // this.data = [
    //   {
    //     'status': true,
    //     'judul': 'ini judul',
    //     'deskripsi': 'ini deksripsi',
    //     'tgl_mulai': '4/10/2017',
    //     'tgl_selesai': '4/11/2017',
    //     'prioritas': 1,
    //     'edit': false
    //   },
    //   {
    //     'status': false,
    //     'judul': 'ini judul 2',
    //     'deskripsi': 'ini deksripsi 2',
    //     'tgl_mulai': '4/10/2017',
    //     'tgl_selesai': '4/11/2017',
    //     'prioritas': 2,
    //     'edit': false
    //   },
    //   {
    //     'status': true,
    //     'judul': 'ini judul 3',
    //     'deskripsi': 'ini deksripsi 3',
    //     'tgl_mulai': '4/10/2017',
    //     'tgl_selesai': '4/11/2017',
    //     'prioritas': 3,
    //     'edit': false
    //   },
    // ];
  }

  ngOnInit() {

    // check if there's data in local storage
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data'));

      this.data.reverse();
      this.sortByPriority();
    }
  }

  // change date to Indonesian date
//  public changeDate(input) {
//    const date = new Date(input);
//
//    const tanggal = date.getDate();
//    const bulan = this.month[date.getMonth()];
//    const tahun = date.getFullYear();
//
//    return tanggal + ' ' + bulan + ' ' + tahun;
//  }
//
  // change status for data row
  public changeStatus(index, input) {
    this.data[index].status = input;

    this.saveLocalStorage();
    this.statusSuccess();
  }

  // select priority for input
  public selectPrioritas(input) {
    this.prioritas = input;
  }

  // delete data row
  public delete(index) {
    this.data.splice(index, 1);

    this.saveLocalStorage();
    this.deleteSuccess();
  }

  // activate edit data row
  public edit(index) {
    this.data[index].edit = true;

    // change tgl_mulai to mydatepicker format
    const tglMulai_temp = new Date(this.data[index].tgl_mulai);
    this.data[index].tgl_mulai = { date: { year: tglMulai_temp.getFullYear(),
      month: tglMulai_temp.getMonth() + 1, day: tglMulai_temp.getDate() } };

    // change tgl_selesai to mydatepicker format
    const tglSelesai_temp = new Date(this.data[index].tgl_selesai);
    this.data[index].tgl_selesai = { date: { year: tglSelesai_temp.getFullYear(),
      month: tglSelesai_temp.getMonth() + 1, day: tglSelesai_temp.getDate() } };
}

  // save edit data row
  public save(index) {
    this.data[index].edit = false;

    // save to temp before change it
    const tglMulai_temp = this.data[index].tgl_mulai;
    const tglSelesai_temp = this.data[index].tgl_selesai;

    // change tgl_selesai to string format;
    this.data[index].tgl_mulai = tglMulai_temp.date.month + '/' + tglMulai_temp.date.day + '/' + tglMulai_temp.date.year;
    this.data[index].tgl_selesai = tglSelesai_temp.date.month + '/' + tglSelesai_temp.date.day + '/' + tglSelesai_temp.date.year;
    this.sortByPriority();
    this.saveLocalStorage();
    this.saveSuccess();
  }

  // submit to add data
  public submit() {

    if (this.tgl_mulai && this.tgl_selesai && this.judul && this.deskripsi && this.prioritas) {

      this.showError = true;

      // change to formatted data
      this.tgl_mulai = this.tgl_mulai.formatted;
      this.tgl_selesai = this.tgl_selesai.formatted;

      // create json object before add to data object
      const dataInput = {
        'status': this.status,
        'judul': this.judul,
        'deskripsi': this.deskripsi,
        'tgl_mulai': this.tgl_mulai,
        'tgl_selesai': this.tgl_selesai,
        'prioritas': this.prioritas,
        'edit': false
      };

      // clear input form
      this.status = 0;
      this.judul = '';
      this.deskripsi = '';
      this.tgl_mulai = '';
      this.tgl_selesai = '';
      this.prioritas = '';

      // add new data
      this.data.push(dataInput);
      this.data.reverse();
      this.sortByPriority();

      this.saveLocalStorage();

      this.pushSuccess();

    } else {
      this.showError = false;
    }

  }

  // save data to local storage
  public saveLocalStorage() {
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  // sort data by priority
  public sortByPriority() {
    this.data.sort(function(a, b) {
      return b.prioritas - a.prioritas;
	  //return a.tgl_selesai - b.tgl_selesai;
    });
  }

  // toastr if success delete row
  public deleteSuccess() {
    this.toastrService.success('Successfully Deleted Todo Item', 'Success');
  }

  // toastr if success add data
  public pushSuccess() {
    this.toastrService.success('Successfully Added Todo Item', 'Success');
  }

  // toastr if success change data row
  public statusSuccess() {
    this.toastrService.success('Successfully Changed Status', 'Success');
  }

  // toastr if success save data row
  public saveSuccess() {
    this.toastrService.success('Successfully Updated List', 'Success');
  }

}
