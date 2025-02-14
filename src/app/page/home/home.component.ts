import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormToCreateOsComponent } from "../../components/form-to-create-os/form-to-create-os.component";
import { NumberPhonePipe } from "../../pipes/number-phone.pipe";
import { CepPipe } from "../../pipes/cep.pipe";
import { CpfCnpjPipe } from "../../pipes/cpf-cnpj.pipe";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, DividerModule, FormToCreateOsComponent, NumberPhonePipe, CepPipe, CpfCnpjPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  visible: boolean = false;
  orderList: any[] = [];
  hideButton: boolean = false;

  onFormDataReceived(formData: any) {
    this.orderList.push(formData);
  }

  showDialog() {
    this.visible = true;
  }

  testTimeout(index: number) {
    this.hideButton = true;
    console.log(this.hideButton);
    setTimeout(() => {
      console.log('Teste de timeout');
    }, 100);

    setTimeout(() => {
      this.downloadPDF(index);
    }, 100);
  }

  async downloadPDF(index: number) {
    const element =  document.getElementById(`invoice-${index}`);
    console.log(element);
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'px', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width ;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`OrdemDeServico_${index + 1}.pdf`);
    }
    this.hideButton = false;
  }

  deleteOrder(index: number) {
    this.orderList.splice(index, 1);
  }

  getSubtotal(order: any): number {
    return order.dataOS.createOffer.reduce((acc: any, offer: any) => acc + (offer.price * offer.quantity), 0);
}
}
