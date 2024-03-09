import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HistoryComponent from '@/components/History.vue'; // Adjust path as needed

const mockAppointments = [
  // Sample appointment objects with properties like startTime, endTime, patientId, type, status
  {
    id: 1,
    startTime: '2024-03-08T10:00:00.000Z',
    endTime: '2024-03-08T11:00:00.000Z',
    patientId: 2,
    type: 'followUp',
    status: 'completed'
  },
  {
    id: 2,
    startTime: '2024-03-07T15:00:00.000Z',
    patientId: 1,
    type: 'checkUp',
    status: 'absent'
  },
  // ... more appointments for testing different scenarios
];

describe('HistoryComponent', () => {
  // Dados de exemplo para testes
  const appointmentsResponse = [
    {
      id: 1,
      patientId: 1,
      startTime: '2024-03-08T09:00:00',
      endTime: '2024-03-08T10:00:00',
      type: 'firstVisit',
      status: 'completed',
    },
  ];

  const patientsResponse = [
    {
      id: 1,
      name: 'John Doe',
    },
  ];

  it('renders correctly with initial data', async () => {
    const wrapper = mount(HistoryComponent, {
      props: {
        appointmentsResponse,
        patientsResponse,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('tr').length).toBeGreaterThan(0);
  });

  it('applies correct styles based on appointment status', async () => {
    const wrapper = mount(HistoryComponent, {
      props: {
        appointmentsResponse,
        patientsResponse,
      },
    });

    await wrapper.vm.$nextTick();

    const appointmentElement = wrapper.find('.bg-green-700'); // Modifique conforme necessário
    expect(appointmentElement.exists()).toBe(true);
  });

});