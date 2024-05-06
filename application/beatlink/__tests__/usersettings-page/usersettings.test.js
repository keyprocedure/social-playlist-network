import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cookies from 'js-cookie';
import UserSettingsPageLayout from '../../src/app/components/UserSettingsPage/UserSettingsPageLayout';
import { useRouter } from 'next/navigation';

jest.mock('js-cookie');

jest.mock('next/navigation', () => {
    const push = jest.fn();
    return {
        useRouter: () => ({
            push,
            pathname: '/usersettings',
        }),
    };
});

describe('UserSettingsPageLayout Tests', () => {
    let mockPush;

    beforeEach(() => {
        jest.clearAllMocks();
        Cookies.get.mockReturnValue('user_id');
        mockPush = jest.fn();
    });

    test('fetches and displays user data on component load', async () => {
        const userData = {
            userImage: 'https://example.com/user.jpg',
            bio: 'User bio',
            status: 'User status',
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(userData),
            })
        );

        render(<UserSettingsPageLayout />);

        await waitFor(() => {
            expect(screen.getByAltText('Profile')).toHaveAttribute('src', userData.userImage);
            expect(screen.getByText(userData.bio)).toBeInTheDocument();
            expect(screen.getByText(userData.status)).toBeInTheDocument();
        });

        global.fetch.mockClear();
    });

    test('handles profile image update correctly', async () => {
        const newImageUrl = 'https://example.com/new_user.jpg';

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    userImage: newImageUrl,
                    bio: 'User bio',
                    status: 'User status',
                }),
            })
        );

        render(<UserSettingsPageLayout />);

        fireEvent.click(screen.getByText('Update Profile Image'));

        fireEvent.change(screen.getByPlaceholderText('Enter image URL'), {
            target: { value: newImageUrl },
        });

        fireEvent.click(screen.getByText('Update Image'));

        await waitFor(() => {
            expect(screen.getByAltText('Profile')).toHaveAttribute('src', newImageUrl);
        });

        global.fetch.mockClear();
    });

    test('handles bio and status updates correctly', async () => {
        const newBio = 'New bio';
        const newStatus = 'New status';

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    userImage: 'https://example.com/user.jpg',
                    bio: newBio,
                    status: newStatus,
                }),
            })
        );

        render(<UserSettingsPageLayout />);

        fireEvent.change(screen.getByPlaceholderText('Update Bio'), {
            target: { value: newBio },
        });

        fireEvent.change(screen.getByPlaceholderText('Update Status'), {
            target: { value: newStatus },
        });

        fireEvent.click(screen.getByText('Submit Changes'));

        await waitFor(() => {
            expect(screen.getByText(newBio)).toBeInTheDocument();
            expect(screen.getByText(newStatus)).toBeInTheDocument();
        });

        global.fetch.mockClear();
    });

    test('deletes the account when delete button is clicked', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
            })
        );

        global.confirm = jest.fn(() => true);

        render(<UserSettingsPageLayout />);

        fireEvent.click(screen.getByText('Delete Account'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/deleteuser/user_id', {
                method: 'DELETE',
            });
        });

        const router = useRouter();
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith('/logout');
        });

        global.fetch.mockClear();
        global.confirm.mockClear();
    });
});
