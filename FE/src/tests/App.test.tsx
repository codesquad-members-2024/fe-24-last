import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';

test('처음 화면이 렌더링 됐을때 Notion text가 보이는지 확인', () => {
    const queryClient = new QueryClient();

    render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );

    const linkElement = screen.getByText(/Notion/);
    expect(linkElement).toBeInTheDocument();
});
