/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import { $, jQuery } from 'jquery';
import Rails from 'rails-ujs';
import Turbolinks from 'turbolinks';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import light from '@fortawesome/fontawesome-pro-light';
import regular from '@fortawesome/fontawesome-pro-regular';
import solid from '@fortawesome/fontawesome-pro-solid';

require('../vendor/jquery.dropdown');

fontawesome.library.add(solid);
Rails.start();
Turbolinks.start();

import '../css/application';

import '../base/fontawesome-fix';

import '../app';
import '../sessions/new';
import '../staff_members/new';