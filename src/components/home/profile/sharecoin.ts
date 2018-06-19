/**
 * Landing page
 */
import { riot, template } from '../../riot-ts';
import store from '../../../model/store';
import { userActions } from '../../../model/users/actions';
import ShareCoinTemplate from './sharecoin.html!text';
import BaseElement from '../../base-element';
import { USERS } from '../../../model/action-types';
import * as utils from '../../../model/utils';

let tag = null;
@template(ShareCoinTemplate)
export default class ShareCoin extends BaseElement {
  private sesureMsg: string = null;
  private static unsubscribe = null;

  private questionsA = utils.getSecurityQuestion().A;
  private questionsB = utils.getSecurityQuestion().B;
  private questionsC = utils.getSecurityQuestion().C;

  mounted() {
    tag = this;
    if (ShareCoin.unsubscribe) ShareCoin.unsubscribe();
    ShareCoin.unsubscribe = store.subscribe(
      this.onApplicationStateChanged.bind(this)
    );
  }

  checkSecureQuestion() {
    let questionA = $('#questionA').val();
    let questionB = $('#questionB').val();
    let questionC = $('#questionC').val();
    let answerA = $('#answerA').val();
    let answerB = $('#answerB').val();
    let answerC = $('#answerC').val();

    if (
      !questionA ||
      !questionB ||
      !questionC ||
      !answerA ||
      !answerB ||
      !answerC
    ) {
      this.sesureMsg = this.getText('sc_question_required_msg');
      return;
    }

    this.sesureMsg = null;
    riot.mount('#confirm-send', 'request-password', {
      cb: this.setSecurityQuestion,
    });
  }

  setSecurityQuestion(password) {
    $('#btn-submit').button('loading');

    let questionA: string = $('#questionA').val();
    let questionB: string = $('#questionB').val();
    let questionC: string = $('#questionC').val();
    let answerA: string = $('#answerA').val();
    let answerB: string = $('#answerB').val();
    let answerC: string = $('#answerC').val();
    let answers = [answerA, answerB, answerC];

    store.dispatch(
      userActions.updateRecoveryKeys(
        questionA,
        answerA,
        questionB,
        answerB,
        questionC,
        answerC,
        password
      )
    );
  }

  clearField() {
    $('#questionA').val('');
    $('#questionB').val('');
    $('#questionC').val('');
    $('#answerA').val('');
    $('#answerB').val('');
    $('#answerC').val('');
  }

  onApplicationStateChanged() {
    let state = store.getState();
    let data = state.userData;
    let type = state.lastAction.type;

    switch (type) {
      case USERS.UPDATE_SECURITY_QUESTIONS_FAIL:
        $('#btn-submit').button('reset');
        super.showError('', this.getText('sc_question_update_fail'));
        break;
      case USERS.UPDATE_SECURITY_QUESTIONS_SUCCESS:
        $('#btn-submit').button('reset');
        super.showMessage(
          '',
          this.getText('sc_question_update_ok'),
          this.clearField
        );
        break;
      default:
        break;
    }

    this.update();
  }
}
