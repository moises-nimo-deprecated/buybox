import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ConfirmationComponent} from '../confirmation/confirmation.component';
import {SellableItemService} from '../../services/sellable-item.service';
import {PurchaseComponent} from '../purchase/purchase.component';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit {
  @ViewChild(ConfirmationComponent)
  confirmationComponent: ConfirmationComponent;
  @ViewChild(PurchaseComponent)
  purchaseComponent: PurchaseComponent;

  constructor(private service: SellableItemService, private sessionService: SessionService) {
  }

  ngAfterViewInit(): void {

  }

  buyProduct(id: number): void {
    const parent = this;
    this.confirmationComponent.title = 'Confirm';
    this.confirmationComponent.message = `Are you sure you want this product?`;
    this.confirmationComponent.confirm = () => {
      this.service.sellableItemGet(id, {
        next(data: any): void {
          parent.purchaseComponent.model = data;
          parent.purchaseComponent.show();
          // cancels the current user session
          parent.sessionService.sessionDelete();
          // restablishes a session
          parent.sessionService.sessionHead();
        }
      });
    };
    this.confirmationComponent.show();
  }

  notify(): void {

  }
}
