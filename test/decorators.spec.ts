/// <reference path="../typings/tsd.d.ts" />

import {
ngInject,
ngConstant,
ngConfig,
ngValue,
ngRun,
ngModule,
ngApp,
ngDepencencies,
ngService,
ngServiceFactory,
ngController,
ngFactory,
ngDirective,
ngProvider
} from 'src/decorators';

describe('#ngDecorators', () => {
  it('ngInject should be defined', () => {
    expect(ngInject).toBeDefined();
  });
  it('ngConstant should be defined', () => {
    expect(ngConstant).toBeDefined();
  });
  it('ngConfig should be defined', () => {
    expect(ngConfig).toBeDefined();
  });
  it('ngValue should be defined', () => {
    expect(ngValue).toBeDefined();
  });
  it('ngRun should be defined', () => {
    expect(ngRun).toBeDefined();
  });
  it('ngModule should be defined', () => {
    expect(ngModule).toBeDefined();
  });
  it('ngApp should be defined', () => {
    expect(ngApp).toBeDefined();
  });
  it('ngDepencencies should be defined', () => {
    expect(ngDepencencies).toBeDefined();
  });
  it('ngService should be defined', () => {
    expect(ngService).toBeDefined();
  });
  it('ngController should be defined', () => {
    expect(ngController).toBeDefined();
  });
  it('ngFactory should be defined', () => {
    expect(ngFactory).toBeDefined();
  });
  it('ngDirective should be defined', () => {
    expect(ngDirective).toBeDefined();
  });
  it('ngProvider should be defined', () => {
    expect(ngProvider).toBeDefined();
  });
});