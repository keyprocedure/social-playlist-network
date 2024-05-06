import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cookies from 'js-cookie';
import UserSettingsPageLayout from '../../src/app/components/UserSettingsPage/UserSettingsPageLayout';
import { useRouter } from 'next/navigation';

// Mocking js-cookie to avoid errors
jest.mock('js-cookie');

// Mocking the useRouter hook from next/navigation
jest.mock('next/navigation', () => {
    const push = jest.fn();
    return {
        useRouter: () => ({
            push, // Mock push function
            pathname: '/usersettings',
        }),
    };
});

describe('UserSettingsPageLayout Tests', () => {
    let mockPush;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        Cookies.get.mockReturnValue('user_id');
        mockPush = jest.fn(); // Initialize mock push function
    });

    test('fetches and displays user data on component load', async () => {
        const userData = {
            userImage: 'https://example.com/user.jpg',
            bio: 'User bio',
            status: 'User status',
        };

        // Mock fetch API
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(userData),
            })
        );

        render(<UserSettingsPageLayout />);

        // Wait for the user data to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByAltText('Profile')).toHaveAttribute('src', userData.userImage);
            expect(screen.getByText(userData.bio)).toBeInTheDocument();
            expect(screen.getByText(userData.status)).toBeInTheDocument();
        });

        // Clean up fetch mock
        global.fetch.mockClear();
    });

    test('handles profile image update correctly', async () => {
        const newImageUrl = 'https://example.com/new_user.jpg';

        // Mock fetch API
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

        // Click the "Update Profile Image" button
        fireEvent.click(screen.getByText('Update Profile Image'));

        // Enter new image URL
        fireEvent.change(screen.getByPlaceholderText('Enter image URL'), {
            target: { value: newImageUrl },
        });

        // Click the "Update Image" button
        fireEvent.click(screen.getByText('Update Image'));

        // Wait for the image to be updated
        await waitFor(() => {
            expect(screen.getByAltText('Profile')).toHaveAttribute('src', newImageUrl);
        });

        // Clean up fetch mock
        global.fetch.mockClear();
    });

    test('handles bio and status updates correctly', async () => {
        const newBio = 'New bio';
        const newStatus = 'New status';

        // Mock fetch API
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

        // Update bio
        fireEvent.change(screen.getByPlaceholderText('Update Bio'), {
            target: { value: newBio },
        });

        // Update status
        fireEvent.change(screen.getByPlaceholderText('Update Status'), {
            target: { value: newStatus },
        });

        // Submit changes
        fireEvent.click(screen.getByText('Submit Changes'));

        // Wait for the bio and status to be updated
        await waitFor(() => {
            expect(screen.getByText(newBio)).toBeInTheDocument();
            expect(screen.getByText(newStatus)).toBeInTheDocument();
        });

        // Clean up fetch mock
        global.fetch.mockClear();
    });

    test('deletes the account when delete button is clicked', async () => {
        // Mock fetch API for account deletion
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
            })
        );

        // Mock the confirm dialog to return true
        global.confirm = jest.fn(() => true);

        // Render the UserSettingsPageLayout component
        render(<UserSettingsPageLayout />);

        // Simulate a click on the "Delete Account" button
        fireEvent.click(screen.getByText('Delete Account'));

        // Verify that the account deletion fetch request is made
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/deleteuser/user_id', {
                method: 'DELETE',
            });
        });

        // Verify that the router push function is called with "/logout"
        const router = useRouter();
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith('/logout');
        });

        // Clean up mocks
        global.fetch.mockClear();
        global.confirm.mockClear();
    });
});