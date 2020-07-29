package com.aircom.computers;

import com.aircom.nvstream.http.ComputerDetails;

public interface ComputerManagerListener {
    void notifyComputerUpdated(ComputerDetails details);
}
