'use babel';

import SinhairShampooView from './sinhair-shampoo-view';
import { CompositeDisposable } from 'atom';

export default {

  sinhairShampooView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sinhairShampooView = new SinhairShampooView(state.sinhairShampooViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sinhairShampooView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sinhair-shampoo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sinhairShampooView.destroy();
  },

  serialize() {
    return {
      sinhairShampooViewState: this.sinhairShampooView.serialize()
    };
  },

  toggle() {
    console.log('SinhairShampoo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
