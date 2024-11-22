import { notify } from '../notify';
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import { getPluginConfig } from '../getPluginConfig';
import { getMediasFromIds } from '../getMediasFormIds';
import { getAttachments } from '../getAttachments';
import { applyInterceptors } from '../applyInterceptor';
import { sendEmail } from '../sendEmail';
import { describe, expect, it, jest } from '@jest/globals';
import { SubscriptionEntry } from '../../../common/types';
import { EventType, RecipientType } from '../../../common/enums';

// Mock dependencies
jest.mock('../../utils/getRecipientEmail');
jest.mock('../getPluginConfig');
jest.mock('../getMediasFormIds');
jest.mock('../getAttachments');
jest.mock('../applyInterceptor');
jest.mock('../sendEmail');

describe('Unit Test for notify Function', () => {
  it('should send an email with the correct options', async () => {
    // Arrange
    const mockSubscription: SubscriptionEntry = {
      id: 'testId',
      subject: 'Test subject',
      collectionName: 'testCollection',
      eventType: EventType.AfterCreate,
      recipients: [],
      content: 'Test content',
      mediaFields: [],
      interceptors: [],
    };

    const mockRecipient = {
      type: RecipientType.ENV,
      value: 'test',
    };
    const mockEntry = {}; // Define your mock entry

    (getRecipientEmail as jest.Mock).mockReturnValue('test@example.com');
    (getPluginConfig as jest.Mock).mockReturnValue('default@example.com');
    (getMediasFromIds as jest.Mock).mockResolvedValue([] as never);
    (getAttachments as jest.Mock).mockResolvedValue([] as never);
    (applyInterceptors as jest.Mock).mockResolvedValue(mockEntry as never);
    (sendEmail as jest.Mock).mockResolvedValue(undefined as never);

    // Act
    await notify(mockSubscription, mockRecipient, mockEntry);

    // Assert
    expect(getRecipientEmail).toHaveBeenCalledWith(mockRecipient, mockEntry);
    expect(getPluginConfig).toHaveBeenCalledWith('defaultFrom');
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@example.com',
        from: 'default@example.com',
      }),
      expect.objectContaining({
        html: mockSubscription.content,
        text: mockSubscription.content,
        subject: mockSubscription.subject,
      }),
      mockEntry
    );
  });
});
