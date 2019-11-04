import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../shared/transactions.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Transaction } from '../shared/models/transaction';
import {AuthService} from '../shared/auth.service';
import {Property} from '../shared/interfaces/property';
import {User} from '../shared/interfaces/user';
import {Deed} from '../shared/interfaces/deed';
import {DeedUser} from '../shared/interfaces/deed-user';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  private property: Property;
  private seller: DeedUser;
  private buyer: DeedUser;
  private deed: Deed;

  constructor(private transactionsService: TransactionsService,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.fetchData();
      }
    });

    this.fetchData();
  }

  fetchData() {
    const id = this.route.snapshot.paramMap.get('id');

    this.transactionsService.getTransaction(id).subscribe(([property, buyer, seller, deed]) => {
        this.buyer = buyer;
        this.seller = seller;
        this.property = property;
        this.deed = deed;
    });



  }
}
