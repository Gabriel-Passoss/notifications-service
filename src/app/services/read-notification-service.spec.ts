import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification-service';
import { Notification } from '@app/entities/notification/notification';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotification;
let notification: Notification;

describe('Read notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotification(notificationsRepository);

    notification = makeNotification();

    notificationsRepository.create(notification);
  });

  it('should be able to read a notification', async () => {
    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    await expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
