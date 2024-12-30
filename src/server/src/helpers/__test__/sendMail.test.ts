import { sendEmail } from '../sendEmail';
import { getEmailService } from '../getStrapiService';
import { describe, expect, it, jest } from '@jest/globals';

jest.mock('../getStrapiService');

describe('Unit Test for sendEmail Funtion', () => {
  it('calls the email service with correct parameters', async () => {
    const mockSendTemplatedEmail = jest.fn().mockResolvedValue({} as never);

    (getEmailService as jest.Mock).mockReturnValue({
      sendTemplatedEmail: mockSendTemplatedEmail,
    } as never);

    const mailOptions = {
      to: 'test@gmail.com',
      from: 'default@gmail.com',
    };

    const template = { subject: 'Test Subject', html: '<p>Test Email</p>' };
    const data = {};

    await sendEmail(mailOptions, template, data);

    expect(mockSendTemplatedEmail).toHaveBeenCalledWith(mailOptions, template, data);
  });

  // Add more tests as needed to cover different scenarios
});
