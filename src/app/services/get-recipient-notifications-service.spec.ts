import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications-service';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: GetRecipientNotifications;

describe('Get recipient notifications', () => {
  beforeEach(async () => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );
  });

  it('should be able to get recipient notifications', async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' }),
    );

    const { notifications } = await sut.execute({
      recipientId: 'recipient-01',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-01' }),
        expect.objectContaining({ recipientId: 'recipient-01' }),
      ]),
    );
  });
});
