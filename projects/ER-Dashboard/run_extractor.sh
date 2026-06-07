#!/bin/bash

# IGD Time Metrics Extractor Runner Script
# Script untuk menjalankan ekstraksi metrik waktu IGD dengan mudah

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fungsi untuk menampilkan banner
show_banner() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "    IGD TIME METRICS EXTRACTOR"
    echo "    Script Ekstraksi Metrik Waktu IGD"
    echo "=================================================="
    echo -e "${NC}"
}

# Fungsi untuk menampilkan help
show_help() {
    echo "Penggunaan:"
    echo "  $0 [FOLDER_PATH] [OPTIONS]"
    echo ""
    echo "Contoh:"
    echo "  $0 \"/path/to/igd/json/files\""
    echo "  $0 \"/Users/ahmad/IGD_Data\" --format excel"
    echo "  $0 \"./IGD Use Case\" --output hasil_analisis"
    echo ""
    echo "Opsi:"
    echo "  --format [excel|csv|both]   Format output (default: both)"
    echo "  --output [nama]             Nama file output (default: igd_metrics)"
    echo "  --no-summary               Jangan tampilkan ringkasan"
    echo "  --help, -h                 Tampilkan help ini"
    echo ""
}

# Fungsi untuk mengecek dependencies
check_dependencies() {
    echo -e "${YELLOW}Mengecek dependencies...${NC}"
    
    # Cek Python
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}Error: Python 3 tidak ditemukan!${NC}"
        echo "Silakan install Python 3 terlebih dahulu."
        exit 1
    fi
    
    # Cek pip packages
    echo "Mengecek Python packages..."
    python3 -c "import pandas, openpyxl" 2>/dev/null
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Installing required Python packages...${NC}"
        pip3 install pandas openpyxl
        if [ $? -ne 0 ]; then
            echo -e "${RED}Error: Gagal menginstall dependencies!${NC}"
            echo "Coba jalankan: pip3 install pandas openpyxl"
            exit 1
        fi
    fi
    
    echo -e "${GREEN}Dependencies OK!${NC}"
}

# Fungsi untuk membuat contoh file konfigurasi
create_config_example() {
    cat > "config_example.json" << 'EOF'
{
  "folder_paths": [
    "/Users/ahmadhidayat/Library/Mobile Documents/com~apple~CloudDocs/Downloads/IGD Use Case",
    "./IGD_Data",
    "/path/to/another/igd/folder"
  ],
  "output_settings": {
    "base_name": "igd_metrics",
    "format": "both",
    "include_timestamp": true
  },
  "analysis_settings": {
    "show_summary": true,
    "export_charts": false,
    "benchmark_thresholds": {
      "triage_minutes": 5,
      "vitals_minutes": 15,
      "medication_minutes": 60
    }
  }
}
EOF
    echo -e "${GREEN}File config_example.json telah dibuat!${NC}"
}

# Fungsi untuk quick run dengan folder yang sudah dikenal
quick_run() {
    DEFAULT_FOLDER="/Users/ahmadhidayat/Library/Mobile Documents/com~apple~CloudDocs/Downloads/IGD Use Case"
    
    if [[ -d "$DEFAULT_FOLDER" ]]; then
        echo -e "${GREEN}Menjalankan ekstraksi pada folder default:${NC}"
        echo "$DEFAULT_FOLDER"
        echo ""
        main "$DEFAULT_FOLDER"
    else
        echo -e "${YELLOW}Folder default tidak ditemukan. Silakan specify folder path.${NC}"
        show_help
    fi
}

# Fungsi utama
main() {
    show_banner
    
    # Parse arguments
    FOLDER_PATH=""
    OUTPUT_NAME="igd_metrics"
    FORMAT="both"
    NO_SUMMARY=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h)
                show_help
                exit 0
                ;;
            --format)
                FORMAT="$2"
                shift 2
                ;;
            --output)
                OUTPUT_NAME="$2"
                shift 2
                ;;
            --no-summary)
                NO_SUMMARY="--no-summary"
                shift
                ;;
            --quick|-q)
                quick_run
                exit 0
                ;;
            --config-example)
                create_config_example
                exit 0
                ;;
            *)
                if [[ -z "$FOLDER_PATH" ]]; then
                    FOLDER_PATH="$1"
                fi
                shift
                ;;
        esac
    done
    
    # Jika tidak ada folder path, minta input
    if [[ -z "$FOLDER_PATH" ]]; then
        echo -e "${YELLOW}Masukkan path folder yang berisi file JSON IGD:${NC}"
        echo -e "${BLUE}(atau gunakan --quick untuk folder default)${NC}"
        read -r FOLDER_PATH
        
        # Jika masih kosong, coba folder default
        if [[ -z "$FOLDER_PATH" ]]; then
            DEFAULT_FOLDER="/Users/ahmadhidayat/Library/Mobile Documents/com~apple~CloudDocs/Downloads/IGD Use Case"
            if [[ -d "$DEFAULT_FOLDER" ]]; then
                FOLDER_PATH="$DEFAULT_FOLDER"
                echo -e "${GREEN}Menggunakan folder default: $FOLDER_PATH${NC}"
            else
                echo -e "${RED}Error: Folder path harus diisi!${NC}"
                exit 1
            fi
        fi
    fi
    
    # Validasi folder path
    if [[ ! -d "$FOLDER_PATH" ]]; then
        echo -e "${RED}Error: Folder '$FOLDER_PATH' tidak ditemukan!${NC}"
        exit 1
    fi
    
    # Cek apakah ada file JSON
    JSON_COUNT=$(find "$FOLDER_PATH" -name "*.json" | wc -l)
    if [[ $JSON_COUNT -eq 0 ]]; then
        echo -e "${RED}Error: Tidak ada file JSON ditemukan di folder '$FOLDER_PATH'!${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Ditemukan $JSON_COUNT file JSON di folder: $FOLDER_PATH${NC}"
    
    # Check dependencies
    check_dependencies
    
    # Buat script Python sementara jika belum ada
    SCRIPT_PATH="igd_time_metrics_extractor.py"
    if [[ ! -f "$SCRIPT_PATH" ]]; then
        echo -e "${YELLOW}Script Python tidak ditemukan. Silakan pastikan file igd_time_metrics_extractor.py ada di direktori yang sama.${NC}"
        exit 1
    fi
    
    # Tambahkan timestamp ke output name jika diinginkan
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    FINAL_OUTPUT="${OUTPUT_NAME}_${TIMESTAMP}"
    
    # Jalankan ekstraksi
    echo -e "${BLUE}Memulai ekstraksi metrik waktu...${NC}"
    echo "Folder: $FOLDER_PATH"
    echo "Output: ${FINAL_OUTPUT}.xlsx / ${FINAL_OUTPUT}.csv"
    echo "Format: $FORMAT"
    echo ""
    
    # Jalankan Python script
    python3 "$SCRIPT_PATH" "$FOLDER_PATH" --output "$FINAL_OUTPUT" --format "$FORMAT" $NO_SUMMARY
    
    if [[ $? -eq 0 ]]; then
        echo ""
        echo -e "${GREEN}✓ Ekstraksi berhasil!${NC}"
        echo ""
        echo "File output yang dibuat:"
        if [[ "$FORMAT" == "excel" || "$FORMAT" == "both" ]]; then
            if [[ -f "${FINAL_OUTPUT}.xlsx" ]]; then
                echo "  📊 ${FINAL_OUTPUT}.xlsx"
                # Buka file Excel jika di macOS
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    echo -e "${BLUE}    Membuka Excel...${NC}"
                    open "${FINAL_OUTPUT}.xlsx" &
                fi
            fi
        fi
        if [[ "$FORMAT" == "csv" || "$FORMAT" == "both" ]]; then
            if [[ -f "${FINAL_OUTPUT}.csv" ]]; then
                echo "  📄 ${FINAL_OUTPUT}.csv"
            fi
        fi
        echo ""
        echo -e "${BLUE}Selesai! 🎉${NC}"
        
        # Tampilkan tips
        echo -e "${YELLOW}Tips:${NC}"
        echo "• Gunakan --quick untuk menjalankan dengan folder default"
        echo "• Gunakan --format excel untuk output Excel saja"
        echo "• File Excel berisi 2 sheet: Raw Data dan Summary"
        
    else
        echo -e "${RED}Error: Ekstraksi gagal!${NC}"
        exit 1
    fi
}

# Jalankan fungsi main dengan semua arguments
main "$@"