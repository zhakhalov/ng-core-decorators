/// <reference path="../typings/tsd.d.ts" />

import {
Inject,
Constant,
Config,
Value,
Run,
Module,
App,
Requires,
Service,
ServiceFactory,
Controller,
Factory,
Directive,
Provider,
Filter,
ClassFactory,
DirectiveFactory,
ProviderFactory
} from 'src/decorators';

describe('#Decorators', () => {
  it('Inject should be defined', () => {
    expect(Inject).toBeDefined();
  });
  it('Constant should be defined', () => {
    expect(Constant).toBeDefined();
  });
  it('Config should be defined', () => {
    expect(Config).toBeDefined();
  });
  it('Value should be defined', () => {
    expect(Value).toBeDefined();
  });
  it('Run should be defined', () => {
    expect(Run).toBeDefined();
  });
  it('Module should be defined', () => {
    expect(Module).toBeDefined();
  });
  it('App should be defined', () => {
    expect(App).toBeDefined();
  });
  it('Requires should be defined', () => {
    expect(Requires).toBeDefined();
  });
  it('Service should be defined', () => {
    expect(Service).toBeDefined();
  });
  it('Controller should be defined', () => {
    expect(Controller).toBeDefined();
  });
  it('Factory should be defined', () => {
    expect(Factory).toBeDefined();
  });
  it('Directive should be defined', () => {
    expect(Directive).toBeDefined();
  });
  it('Provider should be defined', () => {
    expect(Provider).toBeDefined();
  });
  it('Filter should be defined', () => {
    expect(Filter).toBeDefined();
  });
  it('ClassFactory should be defined', () => {
    expect(ClassFactory).toBeDefined();
  });
  it('DirectiveFactory should be defined', () => {
    expect(DirectiveFactory).toBeDefined();
  });
  it('ProviderFactory should be defined', () => {
    expect(ProviderFactory).toBeDefined();
  });
});
