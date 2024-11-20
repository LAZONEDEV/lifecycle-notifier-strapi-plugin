import { RecipientType } from '../../../common/enums';
import { createRecipientLabel } from '../createRecipientLabel';

describe('test suite createRecipients utils', () => {
  test('returns the custom recipient value if type is CUSTOM', () => {
    const recipient = { type: RecipientType.CUSTOM, value: 'customValue' };
    const collectionName = 'testCollection';
    expect(createRecipientLabel(recipient, collectionName)).toBe('customValue');
  });

  test('returns ENV prepended with the value if type is ENV', () => {
    const recipient = { type: RecipientType.ENV, value: 'envValue' };
    const collectionName = 'testCollection';
    expect(createRecipientLabel(recipient, collectionName)).toBe('ENV.envValue');
  });

  test('returns collection name prepended with the recipient value if type is not CUSTOM or ENV', () => {
    const recipient = { type: RecipientType.FROM_MODEL, value: 'otherValue' };
    const collectionName = 'testCollection';
    expect(createRecipientLabel(recipient, collectionName)).toBe('testCollection.otherValue');
  });
});
