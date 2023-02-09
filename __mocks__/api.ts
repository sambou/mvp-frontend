export const user = {
  firstName: 'Foo',
  lastName: 'Bar',
  email: 'foo@bar.com',
  userId: 'foobar',
};

export const project = {
  projectId: 'project',
  userIds: [],
  rule: 'rule',
  gatewayIds: [],
  structure: 'structure',
  industry: 'industry',
  website: 'website',
  description: 'description',
  image: 'image',
  name: 'Fake project',
};

export const gateway = {
  gatewayId: 'gateway',
  userIds: [],
  name: 'fake gateway',
  type: 'type',
  apiKey: 'apiKey',
  secondaryApiKey: 'secondaryApiKey',
  description: 'description',
};

export const report = {
  paymentId: 123,
  amount: 2.55,
  projectId: 'project',
  gatewayId: 'gateway',
  userIds: [],
  modified: '2022-01-01',
  created: '2022-01-01',
};
