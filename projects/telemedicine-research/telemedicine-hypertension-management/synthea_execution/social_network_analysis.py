#!/usr/bin/env python3
"""
Social Network Analysis for Hypertension Telemedicine Study
Analyzes patient-provider and patient-patient networks in the synthetic pilot data
"""

import pandas as pd
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter, defaultdict
import warnings
warnings.filterwarnings('ignore')

# Set style for plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class SocialNetworkAnalyzer:
    def __init__(self, data_path):
        self.data_path = data_path
        self.load_data()

    def load_data(self):
        """Load all necessary CSV files"""
        print("Loading data files...")
        self.encounters = pd.read_csv(f"{self.data_path}/encounters.csv")
        self.providers = pd.read_csv(f"{self.data_path}/providers.csv")
        self.patients = pd.read_csv(f"{self.data_path}/patients.csv")
        self.organizations = pd.read_csv(f"{self.data_path}/organizations.csv")

        # Calculate age from birthdate
        self.patients['BIRTHDATE'] = pd.to_datetime(self.patients['BIRTHDATE'])
        current_date = pd.Timestamp.now()
        self.patients['AGE'] = (current_date - self.patients['BIRTHDATE']).dt.days // 365

        print(f"Loaded {len(self.encounters)} encounters")
        print(f"Loaded {len(self.providers)} providers")
        print(f"Loaded {len(self.patients)} patients")
        print(f"Loaded {len(self.organizations)} organizations")

    def create_patient_provider_network(self):
        """Create bipartite network of patients and providers based on encounters"""
        print("\nCreating patient-provider network...")

        # Create bipartite graph
        self.G_patient_provider = nx.Graph()

        # Add nodes with types
        for _, patient in self.patients.iterrows():
            self.G_patient_provider.add_node(f"PATIENT_{patient['Id']}",
                                           type='patient',
                                           gender=patient['GENDER'],
                                           age=patient['AGE'])

        for _, provider in self.providers.iterrows():
            self.G_patient_provider.add_node(f"PROVIDER_{provider['Id']}",
                                           type='provider',
                                           name=provider['NAME'],
                                           speciality=provider['SPECIALITY'],
                                           gender=provider['GENDER'])

        # Add edges based on encounters
        for _, encounter in self.encounters.iterrows():
            patient_node = f"PATIENT_{encounter['PATIENT']}"
            provider_node = f"PROVIDER_{encounter['PROVIDER']}"

            if patient_node in self.G_patient_provider.nodes and provider_node in self.G_patient_provider.nodes:
                # Add edge with encounter details
                if self.G_patient_provider.has_edge(patient_node, provider_node):
                    self.G_patient_provider[patient_node][provider_node]['weight'] += 1
                else:
                    self.G_patient_provider.add_edge(patient_node, provider_node, weight=1)

        print(f"Patient-Provider Network: {self.G_patient_provider.number_of_nodes()} nodes, {self.G_patient_provider.number_of_edges()} edges")

    def analyze_patient_provider_network(self):
        """Analyze centrality measures and structural properties of patient-provider network"""
        print("\nAnalyzing patient-provider network structure...")

        # Basic network properties
        self.patient_provider_stats = {
            'total_nodes': self.G_patient_provider.number_of_nodes(),
            'total_edges': self.G_patient_provider.number_of_edges(),
            'density': nx.density(self.G_patient_provider),
            'is_connected': nx.is_connected(self.G_patient_provider),
            'num_components': nx.number_connected_components(self.G_patient_provider)
        }

        # Node counts by type
        patient_nodes = [n for n, d in self.G_patient_provider.nodes(data=True) if d['type'] == 'patient']
        provider_nodes = [n for n, d in self.G_patient_provider.nodes(data=True) if d['type'] == 'provider']

        self.patient_provider_stats['num_patients'] = len(patient_nodes)
        self.patient_provider_stats['num_providers'] = len(provider_nodes)

        # Centrality measures
        degree_centrality = nx.degree_centrality(self.G_patient_provider)
        betweenness_centrality = nx.betweenness_centrality(self.G_patient_provider)
        closeness_centrality = nx.closeness_centrality(self.G_patient_provider)

        # Store centrality for providers
        provider_centrality = {}
        for provider in provider_nodes:
            provider_centrality[provider] = {
                'degree': degree_centrality[provider],
                'betweenness': betweenness_centrality[provider],
                'closeness': closeness_centrality[provider],
                'degree_raw': self.G_patient_provider.degree(provider)
            }

        self.provider_centrality = provider_centrality

        # Find top providers by different metrics
        top_degree = sorted(provider_centrality.items(), key=lambda x: x[1]['degree'], reverse=True)[:5]
        top_betweenness = sorted(provider_centrality.items(), key=lambda x: x[1]['betweenness'], reverse=True)[:5]

        print(f"Top 5 providers by degree centrality:")
        for i, (provider, metrics) in enumerate(top_degree, 1):
            provider_id = provider.replace('PROVIDER_', '')
            provider_name = self.providers[self.providers['Id'] == provider_id]['NAME'].iloc[0]
            print(f"  {i}. {provider_name}: {metrics['degree']:.3f} (Degree: {metrics['degree_raw']})")

    def create_patient_patient_network(self):
        """Create patient-patient network based on shared providers"""
        print("\nCreating patient-patient network based on shared providers...")

        self.G_patient_patient = nx.Graph()

        # Add all patient nodes
        for _, patient in self.patients.iterrows():
            self.G_patient_patient.add_node(patient['Id'],
                                          gender=patient['GENDER'],
                                          age=patient['AGE'])

        # Create patient-provider mapping
        patient_providers = defaultdict(set)
        for _, encounter in self.encounters.iterrows():
            patient_providers[encounter['PATIENT']].add(encounter['PROVIDER'])

        # Create edges between patients who share providers
        patient_list = list(patient_providers.keys())
        for i, patient1 in enumerate(patient_list):
            for patient2 in patient_list[i+1:]:
                # Count shared providers
                shared_providers = patient_providers[patient1] & patient_providers[patient2]
                if shared_providers:
                    # Weight by number of shared providers
                    self.G_patient_patient.add_edge(patient1, patient2,
                                                  weight=len(shared_providers),
                                                  shared_providers=list(shared_providers))

        print(f"Patient-Patient Network: {self.G_patient_patient.number_of_nodes()} nodes, {self.G_patient_patient.number_of_edges()} edges")

    def analyze_patient_patient_network(self):
        """Analyze patient-patient network structure"""
        print("\nAnalyzing patient-patient network structure...")

        # Basic network properties
        self.patient_patient_stats = {
            'total_nodes': self.G_patient_patient.number_of_nodes(),
            'total_edges': self.G_patient_patient.number_of_edges(),
            'density': nx.density(self.G_patient_patient),
            'is_connected': nx.is_connected(self.G_patient_patient),
            'num_components': nx.number_connected_components(self.G_patient_patient)
        }

        # Centrality measures for patients
        degree_centrality = nx.degree_centrality(self.G_patient_patient)
        betweenness_centrality = nx.betweenness_centrality(self.G_patient_patient)
        clustering = nx.clustering(self.G_patient_patient)

        # Store patient metrics
        self.patient_metrics = {}
        for patient_id in self.G_patient_patient.nodes():
            self.patient_metrics[patient_id] = {
                'degree': degree_centrality[patient_id],
                'betweenness': betweenness_centrality[patient_id],
                'clustering': clustering[patient_id],
                'degree_raw': self.G_patient_patient.degree(patient_id)
            }

        # Community detection
        communities = nx.community.louvain_communities(self.G_patient_patient)
        self.patient_patient_stats['num_communities'] = len(communities)
        self.patient_patient_stats['avg_community_size'] = np.mean([len(c) for c in communities])

        print(f"Patient network density: {self.patient_patient_stats['density']:.4f}")
        print(f"Number of communities detected: {self.patient_patient_stats['num_communities']}")
        print(f"Average community size: {self.patient_patient_stats['avg_community_size']:.1f}")

    def visualize_networks(self):
        """Create visualizations of both networks"""
        print("\nCreating network visualizations...")

        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        fig.suptitle('Social Network Analysis: Hypertension Telemedicine Study', fontsize=16)

        # 1. Patient-Provider Network (sample)
        ax1 = axes[0, 0]
        # Create a smaller sample for visualization
        sample_nodes = list(self.G_patient_provider.nodes())[:100]  # Sample first 100 nodes
        G_sample = self.G_patient_provider.subgraph(sample_nodes)

        pos = nx.spring_layout(G_sample, k=1, iterations=50)
        patient_nodes_sample = [n for n, d in G_sample.nodes(data=True) if d['type'] == 'patient']
        provider_nodes_sample = [n for n, d in G_sample.nodes(data=True) if d['type'] == 'provider']

        nx.draw_networkx_nodes(G_sample, pos, nodelist=patient_nodes_sample,
                              node_color='lightblue', node_size=50, alpha=0.7, ax=ax1)
        nx.draw_networkx_nodes(G_sample, pos, nodelist=provider_nodes_sample,
                              node_color='lightcoral', node_size=100, alpha=0.7, ax=ax1)
        nx.draw_networkx_edges(G_sample, pos, alpha=0.3, width=0.5, ax=ax1)
        ax1.set_title('Patient-Provider Network (Sample)')
        ax1.axis('off')

        # 2. Provider Degree Distribution
        ax2 = axes[0, 1]
        provider_degrees = [self.G_patient_provider.degree(n) for n in self.G_patient_provider.nodes()
                          if self.G_patient_provider.nodes[n]['type'] == 'provider']
        ax2.hist(provider_degrees, bins=20, alpha=0.7, color='coral', edgecolor='black')
        ax2.set_xlabel('Number of Patients per Provider')
        ax2.set_ylabel('Number of Providers')
        ax2.set_title('Provider Degree Distribution')
        ax2.grid(True, alpha=0.3)

        # 3. Patient-Patient Network (sample)
        ax3 = axes[1, 0]
        # Sample largest connected component
        largest_cc = max(nx.connected_components(self.G_patient_patient), key=len)
        G_patient_sample = self.G_patient_patient.subgraph(list(largest_cc)[:100])

        pos_patient = nx.spring_layout(G_patient_sample, k=1, iterations=50)
        nx.draw_networkx_nodes(G_patient_sample, pos_patient, node_color='lightgreen',
                              node_size=50, alpha=0.7, ax=ax3)
        nx.draw_networkx_edges(G_patient_sample, pos_patient, alpha=0.3, width=0.5, ax=ax3)
        ax3.set_title('Patient-Patient Network (Largest Component Sample)')
        ax3.axis('off')

        # 4. Patient Degree Distribution
        ax4 = axes[1, 1]
        patient_degrees = [self.G_patient_patient.degree(n) for n in self.G_patient_patient.nodes()]
        ax4.hist(patient_degrees, bins=20, alpha=0.7, color='green', edgecolor='black')
        ax4.set_xlabel('Number of Shared Provider Connections')
        ax4.set_ylabel('Number of Patients')
        ax4.set_title('Patient Degree Distribution')
        ax4.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig(f'{self.data_path}/social_network_visualization.png', dpi=300, bbox_inches='tight')
        plt.show()

    def generate_report(self):
        """Generate comprehensive social network analysis report"""
        print("\nGenerating comprehensive report...")

        report = f"""
# Social Network Analysis Report
## Hypertension Telemedicine Study

### Executive Summary
This analysis examines the social network structures within the synthetic hypertension telemedicine pilot study, focusing on patient-provider interactions and patient-patient connections through shared providers.

### 1. Patient-Provider Network Analysis

#### Network Structure
- **Total Nodes**: {self.patient_provider_stats['total_nodes']:,}
- **Patients**: {self.patient_provider_stats['num_patients']:,}
- **Providers**: {self.patient_provider_stats['num_providers']:,}
- **Total Edges**: {self.patient_provider_stats['total_edges']:,}
- **Network Density**: {self.patient_provider_stats['density']:.4f}
- **Connected Components**: {self.patient_provider_stats['num_components']}

#### Key Findings
1. **Provider Load Distribution**: The network shows variation in provider workload, with some providers handling significantly more patients than others.
2. **Network Connectivity**: {'The network is fully connected' if self.patient_provider_stats['is_connected'] else f'The network has {self.patient_provider_stats["num_components"]} disconnected components'}

#### Top Providers by Patient Load
"""

        # Add top providers info
        top_providers = sorted(self.provider_centrality.items(),
                             key=lambda x: x[1]['degree_raw'], reverse=True)[:10]

        for i, (provider, metrics) in enumerate(top_providers, 1):
            provider_id = provider.replace('PROVIDER_', '')
            provider_info = self.providers[self.providers['Id'] == provider_id]
            if not provider_info.empty:
                provider_name = provider_info['NAME'].iloc[0]
                provider_speciality = provider_info['SPECIALITY'].iloc[0]
                report += f"{i}. **{provider_name}** ({provider_speciality}): {metrics['degree_raw']} patients\n"

        report += f"""
### 2. Patient-Patient Network Analysis

#### Network Structure (Based on Shared Providers)
- **Total Nodes**: {self.patient_patient_stats['total_nodes']:,}
- **Total Edges**: {self.patient_patient_stats['total_edges']:,}
- **Network Density**: {self.patient_patient_stats['density']:.4f}
- **Connected Components**: {self.patient_patient_stats['num_components']}
- **Detected Communities**: {self.patient_patient_stats['num_communities']}
- **Average Community Size**: {self.patient_patient_stats['avg_community_size']:.1f}

#### Key Findings
1. **Patient Connectivity**: Patients are connected through shared providers, creating potential pathways for peer influence and information diffusion.
2. **Community Structure**: The network naturally forms {self.patient_patient_stats['num_communities']} distinct communities, likely representing groups of patients served by the same sets of providers.
3. **Network Sparsity**: With a density of {self.patient_patient_stats['density']:.4f}, the patient network is relatively sparse, indicating limited direct patient-to-patient connections.

### 3. Implications for Telemedicine Hypertension Management

#### Clinical Care Coordination
- **Provider Centrality**: Identifying highly central providers can help understand key influencers in the care network.
- **Care Continuity**: Patients connected through shared providers may benefit from coordinated care protocols.

#### Peer Support Opportunities
- **Community-Based Interventions**: The detected communities could serve as natural units for peer support programs.
- **Information Diffusion**: Understanding network structure can help optimize dissemination of health education materials.

#### Resource Allocation
- **Provider Load Balancing**: Network analysis reveals provider workload patterns that could inform resource allocation decisions.
- **Network Bridges**: Patients with high betweenness centrality could serve as bridges for peer support initiatives.

### 4. Limitations and Considerations

1. **Synthetic Data**: This analysis is based on simulated data and may not reflect real-world network structures.
2. **Temporal Dynamics**: The analysis is static and doesn't account for changes in network structure over time.
3. **Connection Types**: Only patient-provider and patient-patient (through providers) connections are considered; other relationship types may exist.

### 5. Recommendations for Real-World Implementation

1. **Enhanced Data Collection**: Include additional relationship types (family, social support, etc.).
2. **Longitudinal Analysis**: Track network evolution over the course of treatment.
3. **Integration with Clinical Data**: Combine network metrics with clinical outcomes for comprehensive analysis.
4. **Privacy Considerations**: Ensure patient privacy when analyzing and utilizing network data.

---
*Report generated on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""

        # Save report
        with open(f'{self.data_path}/social_network_analysis_report.md', 'w') as f:
            f.write(report)

        print("Report saved to: social_network_analysis_report.md")
        return report

    def run_complete_analysis(self):
        """Execute the complete social network analysis"""
        print("Starting Social Network Analysis for Hypertension Telemedicine Study")
        print("=" * 70)

        # Create networks
        self.create_patient_provider_network()
        self.create_patient_patient_network()

        # Analyze networks
        self.analyze_patient_provider_network()
        self.analyze_patient_patient_network()

        # Visualize
        self.visualize_networks()

        # Generate report
        report = self.generate_report()

        print("\n" + "=" * 70)
        print("Social Network Analysis Complete!")
        print("Files generated:")
        print("  - social_network_analysis_report.md")
        print("  - social_network_visualization.png")

        return report

# Main execution
if __name__ == "__main__":
    data_path = "/Users/ahmadhidayat/claude-code/projects/telemedicine-research/telemedicine-hypertension-management/synthea_execution/output/hypertension_pilot_study/csv"

    analyzer = SocialNetworkAnalyzer(data_path)
    analyzer.run_complete_analysis()