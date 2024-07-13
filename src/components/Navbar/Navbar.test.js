import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/react';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Navbar', () => {
  it('should render the correct heading', () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText('Vaccine Scheduler')).toBeInTheDocument();
  });

  it('should render "Novo Agendamento" button on list page', () => {
    renderWithRouter(<Navbar />, { route: '/list' });

    expect(screen.getByText('Novo Agendamento')).toBeInTheDocument();
  });

  it('should not render "Ver Agendamentos" button on list page', () => {
    renderWithRouter(<Navbar />, { route: '/list' });

    expect(screen.queryByText('Ver Agendamentos')).not.toBeInTheDocument();
  });

  it('should render "Ver Agendamentos" button on forms page', () => {
    renderWithRouter(<Navbar />, { route: '/' });

    expect(screen.getByText('Ver Agendamentos')).toBeInTheDocument();
  });

  it('should not render "Novo Agendamento" button on forms page', () => {
    renderWithRouter(<Navbar />, { route: '/' });

    expect(screen.queryByText('Novo Agendamento')).not.toBeInTheDocument();
  });
});