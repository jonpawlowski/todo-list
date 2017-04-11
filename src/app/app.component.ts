import { Component } from '@angular/core';
import { IMyOptions } from 'mydatepicker';
import { ToastrService } from 'ngx-toastr';

import { Data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public myDatePickerOptions: IMyOptions = {
      dateFormat: 'mm/dd/yyyy',
  };

  public data = [];

  public model = [];

  public month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
  'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  // data form
  public status;
  public judul;
  public deskripsi;
  public tgl_mulai;
  public tgl_selesai;
  public prioritas;

  constructor(private toastrService: ToastrService) {
    const date = new Date();

    this.data = [
      {
        'status': true,
        'judul': 'ini judul',
        'deskripsi': 'ini deksripsi',
        'tgl_mulai': '4/10/2017',
        'tgl_selesai': '4/11/2017',
        'prioritas': 1,
        'edit': false
      },
      {
        'status': false,
        'judul': 'ini judul 2',
        'deskripsi': 'ini deksripsi 2',
        'tgl_mulai': '4/10/2017',
        'tgl_selesai': '4/11/2017',
        'prioritas': 2,
        'edit': false
      },
      {
        'status': true,
        'judul': 'ini judul 3',
        'deskripsi': 'ini deksripsi 3',
        'tgl_mulai': '4/10/2017',
        'tgl_selesai': '4/11/2017',
        'prioritas': 3,
        'edit': false
      },
    ];
  }

  public statusInput(input) {
    this.status = input;
  }

  public changeDate(input) {
    const date = new Date(input);

    const tanggal = date.getDate();
    const bulan = this.month[date.getMonth()];
    const tahun = date.getFullYear();

    return tanggal + ' ' + bulan + ' ' + tahun;
  }

  public changeStatus(index, input) {
    this.data[index].status = input;
    this.statusSuccess();
  }

  public delete(index) {
    this.data.splice(index, 1);
    this.deleteSuccess();
  }

  public edit(index) {
    this.data[index].edit = true;
  }

  public save(index) {
    this.data[index].edit = false;
  }

  public submit() {
    this.tgl_mulai = this.tgl_mulai.formatted;
    this.tgl_selesai = this.tgl_selesai.formatted;
    const dataInput = {
      'status': this.status,
      'judul': this.judul,
      'deskripsi': this.deskripsi,
      'tgl_mulai': this.tgl_mulai,
      'tgl_selesai': this.tgl_selesai,
      'prioritas': this.prioritas,
      'edit': false
    };

    this.status = 0;
    this.judul = '';
    this.deskripsi = '';
    this.tgl_mulai = '';
    this.tgl_selesai = '';
    this.prioritas = '';

    this.data.push(dataInput);
    this.pushSuccess();
  }

  public selectStatus(input) {
    this.status = input;
  }

  public selectPrioritas(input) {
    this.prioritas = input;
  }

  deleteSuccess() {
    this.toastrService.success('Berhasil Menghapus  Data', 'Berhasil');
  }

  pushSuccess() {
    this.toastrService.success('Berhasil Tambah Data', 'Berhasil');
  }

  statusSuccess() {
    this.toastrService.success('Berhasil Ubah Status', 'Berhasil');
  }

}
