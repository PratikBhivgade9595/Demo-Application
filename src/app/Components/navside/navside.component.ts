import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.scss']
})
export class NavsideComponent implements OnInit {

  @Input() addEvent: boolean = false;


  List = [
    {
      number : '1',
      name : 'Home',
      icon : 'fa-sharp fa-solid fa-house'
    },
    {
      number : '2',
      name : 'Show Product',
      icon : 'fa-brands fa-shopify'
    },
    {
      number : '3',
      name : 'Settings',
      icon : 'fa-solid fa-gear'
    },
    {
      number : '4',
      name : 'About',
      icon : 'fa-sharp fa-solid fa-ban'
    },
    {
      number : '5',
      name : 'Contact',
      icon : 'fa-sharp fa-solid fa-address-book'
    }
  ];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  route(item:string) {
    if (item === "Home") {
      this.router.navigateByUrl("/")
    }else if (item === "Show Product")
      this.router.navigateByUrl("/showProduct")
  }

}
