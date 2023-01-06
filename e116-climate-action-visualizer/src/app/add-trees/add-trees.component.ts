import { Component } from '@angular/core';

@Component({
  selector: 'app-add-trees',
  templateUrl: './add-trees.component.html',
  styleUrls: ['./add-trees.component.scss'],
})
export class AddTreesComponent {
  additionalTrees = 1;

  async addTree() {
    const key = 'ttrees:currentTrees';
    const currentTrees: number = Number.parseInt(
      window.localStorage.getItem('ttrees:currentTrees') ?? '0',
      10
    );
    const newTrees = currentTrees + this.additionalTrees;
    window.localStorage.setItem(key, newTrees.toString());

    // TODO draw the additional tree
  }
}
