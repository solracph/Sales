import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

const confirmButtonColor = '#409444';
const cancelButtonColor = '#d33';

@Injectable()
export class SwalService {
    
   public confirmDialog(title: string, text: string , callback : () => void ){
    Swal.fire({
        title: title,
        text: text,
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: 'Yes',
        customClass: 'swal-confirm-dialog'
      }).then((result) => {
        if (result.value) {
            callback();
        }
      })
   }
}

