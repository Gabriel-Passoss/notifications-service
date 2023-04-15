import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications-service';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: CountRecipientNotifications;

describe('Count recipient notifications', () => {
  beforeEach(async () => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new CountRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );
  });

  it('should be able to count recipient notifications', async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' }),
    );

    const { count } = await sut.execute({
      recipientId: 'recipient-01',
    });

    expect(count).toEqual(2);
  });
});
