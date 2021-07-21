import { Component, OnInit } from "@angular/core";
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import { HttpClient } from "@angular/common/http";

import { fonts } from "./../../config/pdfFonts";
import { PdfService } from '../../services/pdf.services';

import pdfMake from "pdfmake/build/pdfmake";

pdfMake.fonts = fonts;
@Component({
  selector: "app-output-pdf",
  templateUrl: "./output-pdf.component.html",
  styleUrls: ["./output-pdf.component.scss"],
  providers: [PdfService]
})
export class OutputPdfComponent implements OnInit {
  pdfSrc:string = '';
  pageVariable = 1;

  fileName = "Leitor de PDF";
  zoom = 0.98; 
  zoomMax = 2; 
  zoomMin = 0.5; 
  zoomAmt = 0.2; 
  zoomScale = "page-width"; 
  totalPages = 0; 
  pdf: PDFDocumentProxy; 
  documentDefinition: object;
  generatedPDF: any;
  pdfData;

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {
    this.pdfSrc = this.pdfService.getPDF();
  }

  onFileSelected() {
    let img: any = document.querySelector("#file");

    if(typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e:any) => {
        this.pdfSrc = e.target.result;
      }

      reader.readAsArrayBuffer(img.files[0]);
    }
  }

  setZoom(type: string): void {
    console.log(type);
    if (type === "increment") {
      this.zoom += this.zoomAmt;
    } else if (type === "decrement") {
      this.zoom -= this.zoomAmt;
    }
  }

  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
    this.totalPages = pdf.numPages;
  }

  selectAll(type: string): void {
    
  }
    

}
