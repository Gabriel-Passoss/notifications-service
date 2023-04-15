import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification-service';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: CancelNotification;

describe('Cancel notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new CancelNotification(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    notificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    await expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
