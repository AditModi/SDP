import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../file-upload';
import { FileUploadService } from '../file-upload.service';
import { int } from 'aws-sdk/clients/datapipeline';


@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  uname=localStorage.getItem('user')
  dname:string;
  parent:string;
  showFile = false;
  fileUploads: Observable<Array<FileUpload>>;
  level:int
  @Output() public childEvent = new EventEmitter()
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.level=0
    //var str="bhaumik1/mydir/file.jpg"
    //var arr =  str.split('/')
    //console.log(arr)
    //console.log(arr.length)
    
  }
  traverse(file:FileUpload){
    this.level=this.level+1
    if(this.level==1){
      this.parent=this.uname+"/"
      
    }
    else{
      this.parent=file.name
    }
    this.childEvent.emit(this.parent)
    console.log(this.parent)
    console.log(this.level)
  }

  

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
      
    }
  }

  createDirectory(){
    //console.log(this.dname)
    this.uploadService.CreateDiectory(this.parent+this.dname+"/")
  }

}
