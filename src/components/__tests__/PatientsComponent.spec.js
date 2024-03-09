import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import PatientsComponent from '@/components/Patients.vue'; // Ajustar o caminho conforme necessário

const mockPatients = [
  {
    id: 1,
    name: 'Jon Snow',
    document: '123456789',
    healthSystemId: '3219874567',
    insurancePlan: 'Basic Plan',
    birthday: '1993-04-27T07:26:59.464Z'
  },
  {
    id: 2,
    name: 'Daenerys Targaryen',
    document: '987654321',
    healthSystemId: '9873214568',
    insurancePlan: 'Premium Plan',
    birthday: '1993-10-15T14:07:37.476Z'
  },
];

const mockAppointments = [
  // Sample appointment objects with properties like startTime, patientId, type, status, description
  {
    id: 1,
    startTime: '2024-03-08T10:00:00.000Z',
    patientId: 2,
    type: 'followUp',
    status: 'pending',
    description: 'Review blood test results'
  },
  {
    id: 2,
    startTime: '2024-03-07T11:00:00.000Z',
    patientId: 1,
    type: 'followUp',
    status: 'pending',
    description: 'Review blood test results'
  },
  {
    id: 3,
    startTime: '2024-03-06T09:00:00.000Z',
    patientId: 3,
    type: 'followUp',
    status: 'pending',
    description: 'Review blood test results'
  },
  // ... more appointments for different days, hours, and statuses
];

describe('PatientsComponent', () => {
  it('renders patient data correctly', () => {
    const wrapper = mount(PatientsComponent, {
      props: {
        patientsResponse: mockPatients,
      },
    });

    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(2);

    const firstRow = tableRows.at(0);
    const firstRowCells = firstRow.findAll('td');

    expect(firstRowCells.at(0).text()).toBe(mockPatients[0].id.toString());
    expect(firstRowCells.at(1).text()).toBe(mockPatients[0].name);
    // ... testar outras células de forma similar
  });

  it('computes totalPages correctly', () => {
    const wrapper = mount(PatientsComponent, {
      props: {
        patientsResponse: mockPatients,
      },
    });

    expect(wrapper.vm.totalPages).toBe(1); // 2 pacientes, 10 por página

    wrapper.vm.pageSize = 5; // Alterar o tamanho da página
    expect(wrapper.vm.totalPages).toBe(1); // Ainda 1 página com 5 por página
  });

  it('computes paginatedPatients correctly on page change', async () => {
    const wrapper = mount(PatientsComponent, {
      props: {
        patientsResponse: mockPatients,
      },
    });

    expect(wrapper.vm.paginatedPatients).toEqual(mockPatients);

    wrapper.vm.currentPage = 2; // Simulate change page

    await wrapper.vm.$nextTick(); // Waiting property update

    expect(wrapper.vm.paginatedPatients).toEqual([]); // Dados vazios na página 2 com dados atuais
  });

});